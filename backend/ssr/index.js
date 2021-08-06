const express = require('express')
const path = require( 'path' );
const { getPageSsr } = require('./getPageSsr')

const app = express()

app.get( /\.(js|css|map|ico)$/, express.static( path.resolve( __dirname, '../../dist/app' ) ) );

app.get('*', async (req, res, next) => {
  const urlToSsr = `${req.protocol}://${req.hostname}:8080${req.path}`
  console.log(urlToSsr);
  const html = await getPageSsr(urlToSsr)
  return res.status(200).send(html) // Serve prerendered page as response.
})

app.listen(4000, () => console.log('Server started. Press Ctrl+C to quit'))
