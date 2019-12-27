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
    publicPath: config.output.publicPath
  })
);
// HMR Support - https://github.com/webpack-contrib/webpack-hot-middleware
app.use(require("webpack-hot-middleware")(compiler));

// Serve the files.
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
