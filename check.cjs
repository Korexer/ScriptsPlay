const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
        page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure()?.errorText));

        await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 15000 });
        
        const rootHtml = await page.evaluate(() => {
            const root = document.getElementById('root');
            return root ? root.innerHTML : 'No root div';
        });

        console.log('Root innerHTML length:', rootHtml.length);
        if (rootHtml.length < 500) {
            console.log('Root HTML:', rootHtml);
        }

        await browser.close();
    } catch (err) {
        console.error('Error in script:', err);
    }
})();
