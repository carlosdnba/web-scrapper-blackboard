const puppeteer = require('puppeteer');
require('dotenv').config();

const login = process.env.LOGIN;
const senha = process.env.SENHA;
const user = process.env.USER;

const date = new Date();
const week_day = date.getDay();
let curSubject = 0;

switch (week_day) {
    case 2:
        curSubject = 540990; // arq.
        break;
    case 3:
        curSubject = 540405; // prob.
        break;
    case 1:
        curSubject = 540387; // redes
        break;
    case 4:
        curSubject = 540394; // sistemas operacionais
        break;
    case 5:
        curSubject = 540394; // sistemas operacionais
        break;
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        // executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    });

    const context = browser.defaultBrowserContext();
    await context.overridePermissions('https://us.bbcollab.com', ['microphone']);
    
    let page = await browser.newPage();
    
    let pages = await browser.pages();
    pages[0].close();

    await page.goto('https://iesb.blackboard.com/');

    page.click('button#agree_button.button-1');
    
    await page.waitFor(500);
    page.type('input#user_id', login);

    await page.waitFor(500);
    page.type('input#password', senha);

    await page.waitFor(500);
    page.click('input#entry-login');

    console.log('Login realizado.')

    await page.waitForNavigation();
    page.goto(`https://iesb.blackboard.com/ultra/courses/_${curSubject}_1/outline`);

    await page.waitFor(12000); 
    page.click('div.element-card.ultra-collab.small-12.medium-4.large-12.is-collab-enabled > div.element-details > div.content')
    
    await page.waitFor(500);
    page.click('ul#sessions-list > li > a');

    await page.waitFor(500);
    pages = await browser.pages();
    pages[0].close();
})();

