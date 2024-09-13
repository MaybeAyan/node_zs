import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

const te = process.argv[2];

const browser = await puppeteer.launch({ headless: false });

const page = await browser.newPage();

await page.setViewport({ width: 1920, height: 1080 });

await page.goto('https://www.juejin.cn');

await page.waitForSelector('.side-navigator-wrap');

const elements = await page.$$('.side-navigator-wrap .nav-item-wrap span');

const titleList = [];

const collectFn = async () => {
  await page.waitForSelector('.entry-list');
  const eles = await page.$$('.entry-list .title-row a');

  for await (const el of eles) {
    const prop = await el.getProperty('innerText');
    const text = await prop.jsonValue();
    titleList.push(text);
  }

  const pyProcess = spawn('python', ['index.py', titleList.join(',')]);
  pyProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  pyProcess.stderr.on('data', (data) => {
    console.log(data.toString());
  });
  pyProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
  console.log(titleList);
};

for await (const el of elements) {
  const prop = await el.getProperty('innerText');
  const text = await prop.jsonValue();
  console.log(text);

  if (text === (te || '前端')) {
    await el.click();
    collectFn();
    break;
  }
}
