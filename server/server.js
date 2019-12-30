const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");

const app = express();
const config = require("../webpack.config.js");
const compiler = webpack(config);
const path = require("path");

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: {
      index: 'index.html'
    }
  })
);
// HMR Support - https://github.com/webpack-contrib/webpack-hot-middleware
app.use(require("webpack-hot-middleware")(compiler));

// const distDir = path.join(__dirname, "../dist/");
const htmlFile = path.join(__dirname, "../dist/index.html");

app.all('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(htmlFile, (err, result) => {
  if (err) {
    return next(err)
  }
  res.set('content-type', 'text/html')
  res.send(result)
  res.end()
  })
})

// Serve the files.
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
