const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const HANDLE = 'cl.dentalvalencia';
const OUTPUT_DIR = path.join(__dirname, 'assets', 'instagram');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    }).on('error', err => { fs.unlink(dest, () => {}); reject(err); });
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 },
    locale: 'es-ES',
  });

  const page = await context.newPage();

  // Dismiss cookie dialogs
  page.on('dialog', d => d.dismiss());

  console.log(`Accediendo a https://www.instagram.com/${HANDLE}/`);
  await page.goto(`https://www.instagram.com/${HANDLE}/`, { waitUntil: 'networkidle', timeout: 30000 });

  // Accept cookies if present
  try {
    const cookieBtn = page.locator('button:has-text("Allow"), button:has-text("Aceptar"), button:has-text("Accept All")').first();
    if (await cookieBtn.isVisible({ timeout: 3000 })) {
      await cookieBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch {}

  // Close login modal if present
  try {
    const closeBtn = page.locator('[aria-label="Close"], button:has-text("Not now"), button:has-text("Ahora no")').first();
    if (await closeBtn.isVisible({ timeout: 3000 })) {
      await closeBtn.click();
      await page.waitForTimeout(1000);
    }
  } catch {}

  await page.waitForTimeout(2000);

  // Extract profile data
  const data = await page.evaluate(() => {
    const getMeta = name => {
      const el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      return el ? el.getAttribute('content') : null;
    };

    // Try to get structured data from window._sharedData or similar
    let sharedData = null;
    try {
      const scripts = Array.from(document.querySelectorAll('script[type="application/json"]'));
      for (const s of scripts) {
        try {
          const json = JSON.parse(s.textContent);
          if (json?.data?.user || json?.require) { sharedData = json; break; }
        } catch {}
      }
    } catch {}

    const description = getMeta('og:description') || '';
    const title = getMeta('og:title') || '';
    const image = getMeta('og:image') || '';

    // Parse followers/following from description
    // Format: "X Followers, X Following, X Posts - See..."
    const follMatch = description.match(/([\d,\.]+[KMk]?)\s*[Ff]ollowers?/);
    const followingMatch = description.match(/([\d,\.]+[KMk]?)\s*[Ff]ollowing/);
    const postsMatch = description.match(/([\d,\.]+[KMk]?)\s*[Pp]osts?/);

    // Get bio from description (after the stats part)
    const bioMatch = description.match(/[-–]\s*(.+)$/);
    const bio = bioMatch ? bioMatch[1].trim() : description;

    // Get name from title
    const nameMatch = title.match(/^(.+?)\s*\(@/);
    const name = nameMatch ? nameMatch[1].trim() : title.replace(/ \(@.*\)$/, '').trim();

    // Verified
    const verified = document.querySelector('[aria-label="Verified"]') !== null ||
                     title.includes('✓') || document.title.includes('✓');

    // Profile image from page
    const imgEl = document.querySelector('img[data-testid="user-avatar"], img._aadp, header img');
    const profileImg = image || (imgEl ? imgEl.src : null);

    // Posts thumbnails
    const postImgs = Array.from(document.querySelectorAll('article img, main img'))
      .filter(img => img.src && img.src.includes('cdninstagram') || img.src?.includes('fbcdn'))
      .slice(0, 9)
      .map(img => ({ src: img.src, alt: img.alt }));

    return {
      handle: window.location.pathname.replace(/\//g, ''),
      name,
      bio,
      followers: follMatch ? follMatch[1] : null,
      following: followingMatch ? followingMatch[1] : null,
      posts: postsMatch ? postsMatch[1] : null,
      profileImage: profileImg,
      verified,
      postImages: postImgs,
      rawDescription: description,
      rawTitle: title,
    };
  });

  console.log('Datos extraídos:', JSON.stringify(data, null, 2));

  // Download profile image
  if (data.profileImage) {
    try {
      await downloadFile(data.profileImage, path.join(OUTPUT_DIR, 'profile.jpg'));
      console.log('Foto de perfil descargada');
      data.profileImageLocal = 'assets/instagram/profile.jpg';
    } catch (e) {
      console.log('No se pudo descargar la foto de perfil:', e.message);
    }
  }

  // Download post images
  data.postImagesLocal = [];
  for (let i = 0; i < data.postImages.length; i++) {
    const img = data.postImages[i];
    if (img.src) {
      try {
        const dest = path.join(OUTPUT_DIR, `post_${i + 1}.jpg`);
        await downloadFile(img.src, dest);
        data.postImagesLocal.push(`assets/instagram/post_${i + 1}.jpg`);
        console.log(`Foto ${i + 1} descargada`);
      } catch (e) {
        console.log(`No se pudo descargar foto ${i + 1}:`, e.message);
      }
    }
  }

  // Take screenshot
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'screenshot.png'), fullPage: false });

  await browser.close();

  // Save data
  fs.writeFileSync(path.join(OUTPUT_DIR, 'profile.json'), JSON.stringify(data, null, 2));
  console.log('\n✅ Scraping completado. Datos guardados en assets/instagram/profile.json');
})();
