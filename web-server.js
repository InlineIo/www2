const path = require("path"),
  express = require("express"),
  cons = require("consolidate"),
  webpack = require("webpack"),
  webpackMiddleware = require("webpack-dev-middleware"),
  webpackConfig = require("./webpack.config"),
  session = require("./session-store"),
  web = express(),
  publicPath = path.join(__dirname, "public");

web.engine("ejs", cons.ejs);
session.addSession(web);

// set .html as the default extension
web.set("view engine", "ejs");
web.set("views", `${__dirname}/views`);

web.use(express.static(publicPath));
web.use(webpackMiddleware(webpack(webpackConfig)));

module.exports.web = web;
