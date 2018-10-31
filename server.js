const path = require("path")
const express = require("express")
const cons = require("consolidate")
const db = require("./models");
const webpack = require("webpack")
const webpackMiddleware = require("webpack-dev-middleware")
const webpackConfig = require("./webpack.config")
const web = require("./web");

const app = express()
const publicPath = path.join(__dirname, "public")
const port = process.env.PORT || 9000

// assign the swig engine to .html files
app.engine("ejs", cons.ejs);

// set .html as the default extension
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("db", db);

app.use(express.static(publicPath))
app.use(webpackMiddleware(webpack(webpackConfig)))
app.use(express.json());

require("./modules/session/server/routes").set(app);
require("./modules/projects/server/routes").set(app);
require("./modules/users/server/routes").set(app);
web.set(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
