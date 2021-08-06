const puppeteer = require('puppeteer')

async function getPageSsr(url) {
  const tsStart = Date.now()

  const browser = await puppeteer.launch({ headless: true })
  const tsLaunched = Date.now()

  const page = await browser.newPage()
  // [SSR] Slower, but kinda guaranteed
  await page.goto(url, { waitUntil: 'networkidle0' })
  // [SSR] Faster, but not-guaranteed
  // await page.goto(url)
  // await page.waitFor(500);
  const tsRendered = Date.now()

  // [SSR] Calling redux state serialization
  page.evaluate('document.serializeReduxStore()')
  const tsStoreSaved = Date.now()

  const html = await page.content()
  const tsContentReceived = Date.now()

  await browser.close()
  const tsBrowserClosed = Date.now()

  console.log(`SSR TIMING: ${tsBrowserClosed - tsStart}`);
  console.log(`tsLaunched: ${tsLaunched - tsStart}`)
  console.log(`tsRendered: ${tsRendered - tsLaunched}`)
  console.log(`tsStoreSaved: ${tsStoreSaved - tsRendered}`)
  console.log(`tsContentReceived: ${tsContentReceived - tsStoreSaved}`)
  console.log(`tsBrowserClosed: ${tsBrowserClosed - tsContentReceived}`)

  return html
}

module.exports = { getPageSsr }
