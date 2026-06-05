const { chromium } = require('playwright');

const HANDLE = 'cl.dentalvalencia';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 900 },
    locale: 'es-ES',
  });

  const page = await context.newPage();
  page.on('dialog', d => d.dismiss());

  await page.goto(`https://www.instagram.com/${HANDLE}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  try {
    for (const txt of ['Aceptar todo', 'Allow all cookies', 'Accept All']) {
      const btn = page.locator(`button:has-text("${txt}")`).first();
      if (await btn.isVisible({ timeout: 1500 })) { await btn.click(); await page.waitForTimeout(800); break; }
    }
  } catch {}
  try {
    for (const txt of ['Ahora no', 'Not now', 'Not Now']) {
      const btn = page.locator(`button:has-text("${txt}")`).first();
      if (await btn.isVisible({ timeout: 1500 })) { await btn.click(); await page.waitForTimeout(800); break; }
    }
  } catch {}

  // Scroll to load all posts
  for (let i = 0; i < 6; i++) {
    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(1000);
  }

  // Get post links
  const postLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]'));
    return [...new Set(links.map(a => a.href))].filter(h => h.includes('/p/') || h.includes('/reel/'));
  });

  await browser.close();

  console.log(`\nEncontrados ${postLinks.length} posts:\n`);
  postLinks.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
  console.log('\nJSON:', JSON.stringify(postLinks, null, 2));
})();
