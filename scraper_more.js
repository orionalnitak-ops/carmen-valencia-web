const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const HANDLE = 'cl.dentalvalencia';
const OUTPUT_DIR = path.join(__dirname, 'assets', 'instagram');
const EXISTING = fs.readdirSync(OUTPUT_DIR).filter(f => f.startsWith('post_') && /post_\d+\.jpg/.test(f)).length;

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { file.close(); fs.unlink(dest, () => {}); return reject(new Error(`HTTP ${res.statusCode}`)); }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    }).on('error', err => { fs.unlink(dest, () => {}); reject(err); });
  });
}

(async () => {
  const browser = await chromium.launch({ headless: false }); // visible para que cargue mejor
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 },
    locale: 'es-ES',
  });

  const page = await context.newPage();

  // Intercept image requests to capture full-size URLs
  const capturedUrls = new Set();
  page.on('response', async res => {
    const url = res.url();
    if ((url.includes('cdninstagram') || url.includes('fbcdn')) &&
        (url.includes('.jpg') || url.includes('_n.jpg')) &&
        !url.includes('s150x150') && !url.includes('s100x100') &&
        !url.includes('s32x32') && !url.includes('profile_pic')) {
      capturedUrls.add(url);
    }
  });

  console.log(`Accediendo a https://www.instagram.com/${HANDLE}/`);
  await page.goto(`https://www.instagram.com/${HANDLE}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Accept cookies
  try {
    for (const txt of ['Aceptar todo', 'Allow all cookies', 'Accept All', 'Aceptar']) {
      const btn = page.locator(`button:has-text("${txt}")`).first();
      if (await btn.isVisible({ timeout: 1500 })) { await btn.click(); await page.waitForTimeout(800); break; }
    }
  } catch {}

  // Close login modal
  try {
    for (const txt of ['Ahora no', 'Not now', 'Not Now']) {
      const btn = page.locator(`button:has-text("${txt}")`).first();
      if (await btn.isVisible({ timeout: 1500 })) { await btn.click(); await page.waitForTimeout(800); break; }
    }
  } catch {}
  try {
    const closeBtn = page.locator('[aria-label="Close"]').first();
    if (await closeBtn.isVisible({ timeout: 1500 })) { await closeBtn.click(); await page.waitForTimeout(800); }
  } catch {}

  // Wait for grid to appear and scroll
  await page.waitForTimeout(2000);
  for (let i = 0; i < 8; i++) {
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(800);
  }
  await page.waitForTimeout(2000);

  // Extract all image srcs from post grid
  const gridImages = await page.evaluate(() => {
    const seen = new Set();
    const results = [];
    document.querySelectorAll('img').forEach(img => {
      const candidates = [];
      if (img.srcset) {
        img.srcset.split(',').forEach(part => {
          const url = part.trim().split(' ')[0];
          if (url) candidates.push(url);
        });
      }
      if (img.src) candidates.push(img.src);
      for (const url of candidates) {
        if ((url.includes('cdninstagram') || url.includes('fbcdn')) &&
            !url.includes('s32x32') && !url.includes('profile_pic') &&
            !seen.has(url)) {
          seen.add(url);
          results.push({ src: url, alt: img.alt || '' });
        }
      }
    });
    return results;
  });

  // Also use network-captured URLs
  capturedUrls.forEach(url => {
    if (!gridImages.find(i => i.src === url)) {
      gridImages.push({ src: url, alt: '' });
    }
  });

  console.log(`Imágenes encontradas: ${gridImages.length}`);
  gridImages.forEach((img, i) => console.log(`  [${i}] ${img.src.slice(0, 80)}... "${img.alt.slice(0, 40)}"`));

  await browser.close();

  // Download new ones
  // Filter out profile pics and tiny thumbs, prefer larger
  const toDownload = gridImages.filter(img =>
    !img.src.includes('s150x150') &&
    !img.src.includes('s100x100') &&
    !img.src.includes('_19/') // profile pic path pattern
  );

  console.log(`\nDescargando ${toDownload.length} imágenes...`);
  let saved = 0;
  for (let i = 0; i < toDownload.length; i++) {
    const img = toDownload[i];
    const num = EXISTING + saved + 1;
    const dest = path.join(OUTPUT_DIR, `post_${num}.jpg`);
    if (fs.existsSync(dest)) { saved++; continue; }
    try {
      await downloadFile(img.src, dest);
      const size = fs.statSync(dest).size;
      if (size < 2000) { fs.unlinkSync(dest); console.log(`  skip post_${num} (muy pequeña)`); continue; }
      console.log(`✅ post_${num}.jpg (${(size/1024).toFixed(0)}KB) — ${img.alt.slice(0, 50)}`);
      saved++;
    } catch (e) {
      console.log(`❌ Error:`, e.message);
    }
  }

  console.log(`\nTotal descargadas: ${saved} nuevas. Posts totales: ${EXISTING + saved}`);
})();
