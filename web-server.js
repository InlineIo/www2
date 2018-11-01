const path = require("path"),
  express = require("express"),
  cons = require("consolidate"),
  webpack = require("webpack"),
  webpackMiddleware = require("webpack-dev-middleware"),
  webpackConfig = require("./webpack.config"),
  session = require("express-session"),
  web = express(),
  publicPath = path.join(__dirname, "public");

web.engine("ejs", cons.ejs);
web.use(session({
  name: "__inline__cid__",
  secret: "sadfnuw skakcr9e8w fskjdhf;ku  gh",
  resave: false,
  sameSite: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: web.get("env") === "production"
  }
}));

// set .html as the default extension
web.set("view engine", "ejs");
web.set("views", `${__dirname}/views`);

web.use(express.static(publicPath));
web.use(webpackMiddleware(webpack(webpackConfig)));

module.exports.web = web;
