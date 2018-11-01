const path = require("path"),
  express = require("express"),
  cons = require("consolidate"),
  webpack = require("webpack"),
  webpackMiddleware = require("webpack-dev-middleware"),
  webpackConfig = require("./webpack.config"),
  web = express();

const publicPath = path.join(__dirname, "public")

// assign the swig engine to .html files
web.engine("ejs", cons.ejs);

// set .html as the default extension
web.set("view engine", "ejs");
web.set("views", __dirname + "/views");

web.use(express.static(publicPath))
web.use(webpackMiddleware(webpack(webpackConfig)))

module.exports.web = web;