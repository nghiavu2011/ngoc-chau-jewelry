const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log('Starting automated tests for Ngoc Chau Jewelry website...');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Path to the local index.html
    const filePath = 'file://' + path.resolve(__dirname, 'index.html');

    // 1. Desktop View - Full Page Screenshot
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(filePath, { waitUntil: 'networkidle2' });
    console.log('Capturing Desktop screenshot...');
    await page.screenshot({ path: 'test_results/desktop_full.png', fullPage: true });

    // 2. Mobile View - Screenshot
    console.log('Switching to iPhone X view...');
    await page.emulate(puppeteer.KnownDevices['iPhone X']);
    await page.goto(filePath, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: 'test_results/mobile_view.png' });

    // 3. Interaction Test: Opening Mobile Menu
    console.log('Testing mobile menu...');
    await page.click('.menu-toggle');
    await page.waitForTimeout(500); // Wait for animation
    await page.screenshot({ path: 'test_results/mobile_menu_open.png' });
    await page.click('.close-menu');

    // 4. Form Test
    console.log('Testing contact form...');
    await page.scrollTo('#lien-he');
    await page.type('input[placeholder="Họ và tên"]', 'Test User');
    await page.type('input[placeholder="Email"]', 'test@example.com');
    await page.type('textarea', 'Đây là tin nhắn test tự động.');
    await page.screenshot({ path: 'test_results/contact_form_filled.png' });

    console.log('Tests completed! Results saved in test_results/ directory.');
    await browser.close();
})();
