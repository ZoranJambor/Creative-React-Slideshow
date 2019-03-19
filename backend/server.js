const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

// Custom path is set because we also want to run
// this script from the 'frontend' directory
require('dotenv').config({ path: __dirname + '/.env' });

app.use(
  '/api',
  proxy({
    target: 'https://api.unsplash.com/',
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
    changeOrigin: true,
    pathRewrite: {
      // We're removing 'api' string from the request,
      // since it's not needed for the Unsplash proxy
      '^/api': '/',
    },
  })
);

const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`Server is listening on port ${port}.`);
});
