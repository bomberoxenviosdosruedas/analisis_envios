const puppeteer = require('puppeteer');

(async () => {
  console.log('--- STARTING ADVERSARIAL STRESS TEST ---');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    pageErrors.push(err.toString());
  });

  page.on('requestfailed', req => {
    failedRequests.push({
      url: req.url(),
      error: req.failure() ? req.failure().errorText : 'unknown'
    });
  });

  // Test 1: Desktop Viewport (1920x1080)
  console.log('1. Loading index.html in Desktop mode (1920x1080)...');
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('file:///D:/repositorios/analisis_envios/index.html', {
    waitUntil: 'networkidle0'
  });

  // Verify critical DOM elements
  const h1 = await page.evaluate(() => document.querySelector('h1')?.innerText?.trim());
  const headerLogo = await page.evaluate(() => {
    const img = document.querySelector('img[src*="logo"]');
    return img ? { src: img.src, naturalWidth: img.naturalWidth } : null;
  });
  const heroCard = await page.evaluate(() => {
    const img = document.querySelector('img[src*="card_mapa"]');
    return img ? { src: img.src, naturalWidth: img.naturalWidth } : null;
  });

  console.log('  DOM check:');
  console.log('    H1 present:', Boolean(h1), `("${h1 ? h1.replace(/\s+/g, ' ').substring(0, 40) : ''}...")`);
  console.log('    Logo loaded:', Boolean(headerLogo && headerLogo.naturalWidth > 0));
  console.log('    Hero card loaded:', Boolean(heroCard && heroCard.naturalWidth > 0));

  // Test Dropdowns in Desktop
  const dropdownTriggers = await page.$$('.dropdown-trigger');
  console.log(`  Desktop dropdown triggers found: ${dropdownTriggers.length}`);
  for (let i = 0; i < dropdownTriggers.length; i++) {
    await dropdownTriggers[i].hover();
    await new Promise(r => setTimeout(r, 100));
  }

  // Test 2: Mobile Viewport (375x812)
  console.log('2. Switching to Mobile mode (375x812 iPhone X) and re-evaluating layout...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await new Promise(r => setTimeout(r, 200));

  const mobileMenuInfo = await page.evaluate(() => {
    const btn = document.getElementById('menu-toggle');
    if (!btn) return { exists: false };
    const rect = btn.getBoundingClientRect();
    const style = window.getComputedStyle(btn);
    return {
      exists: true,
      display: style.display,
      visibility: style.visibility,
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left
    };
  });
  console.log('  Mobile menu toggle button layout:', mobileMenuInfo);

  if (mobileMenuInfo.exists && mobileMenuInfo.display !== 'none' && mobileMenuInfo.width > 0) {
    console.log('  Clicking #menu-toggle via evaluate...');
    await page.evaluate(() => document.getElementById('menu-toggle').click());
    await new Promise(r => setTimeout(r, 400));

    const drawerStatus = await page.evaluate(() => {
      const overlay = document.getElementById('mobile-overlay');
      const drawer = document.getElementById('mobile-nav');
      return {
        overlayOpen: overlay ? overlay.classList.contains('active') : false,
        drawerTransform: drawer ? window.getComputedStyle(drawer).transform : null
      };
    });
    console.log('  Drawer status after open:', drawerStatus);

    // Close drawer
    await page.evaluate(() => {
      const closeBtn = document.getElementById('drawer-close-btn');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));
  }

  // Test 3: Scroll & Dynamic Animation Triggering
  console.log('3. Simulating aggressive scroll events across the document...');
  await page.evaluate(async () => {
    const totalHeight = document.body.scrollHeight;
    const step = 200;
    for (let i = 0; i <= totalHeight; i += step) {
      window.scrollTo(0, i);
      await new Promise(res => setTimeout(res, 20));
    }
  });

  await new Promise(r => setTimeout(r, 500));

  await browser.close();

  console.log('--- TEST SUMMARY ---');
  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) console.log('Errors:', consoleErrors);
  console.log('Page Runtime Exceptions count:', pageErrors.length);
  if (pageErrors.length > 0) console.log('Exceptions:', pageErrors);
  console.log('Failed Requests count:', failedRequests.length);
  if (failedRequests.length > 0) console.log('Failed Requests:', failedRequests);

  const passed = consoleErrors.length === 0 && pageErrors.length === 0 && failedRequests.length === 0;
  console.log('OVERALL ADVERSARIAL STRESS TEST RESULT:', passed ? 'PASS (ZERO REGRESSIONS)' : 'FAIL');
  if (!passed) process.exit(1);
})();
