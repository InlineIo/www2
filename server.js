const path = require("path")
const express = require("express")
const cons = require("consolidate")
const webpack = require("webpack")
const webpackMiddleware = require("webpack-dev-middleware")
const webpackConfig = require("./webpack.config")

const app = express()
const publicPath = path.join(__dirname, "public")
const port = process.env.PORT || 9000

// assign the swig engine to .html files
app.engine("ejs", cons.ejs);

// set .html as the default extension
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(publicPath))
app.use(webpackMiddleware(webpack(webpackConfig)))

app.get("/", (req, res) => {
  res.render("signin");
});

app.get("/projects-page", (req, res) => {
  res.render("projects", { projects: [{ name: "Betterez" }, { name: "Grupo senda" }] });
});

app.get("/projects-list", (req, res) => {
  res.render("projects/list-items", { projects: [{ name: "Betterez" }, { name: "Grupo senda" }, , { name: "Scottish" }] });
});


app.post("/projects", (req, res) => {
  console.log("POSTED TO projects");
  res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
