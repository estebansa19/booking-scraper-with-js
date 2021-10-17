const puppeteer = require('puppeteer-core');

async function startBrowser() {
  let browser;

  try {
    console.log('Opening the browser...');
    browser = await puppeteer.launch({
      headless: false,
      executablePath: '/usr/bin/google-chrome-stable',
      args: ['--disabled-setuid-sandbox'], 'ignoreHTTPSErrors': true,
      defaultViewport: {
        width: 1920,
        height: 1080
      }
    })
  } catch(err) {

    console.log(`Couldn't create a browser instance: ${err}`);
  }

  return browser;
}

module.exports = {
  startBrowser
}
