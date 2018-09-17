const path = require("path")
const express = require("express")
const cons = require("consolidate")
const db = require("./models");
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
app.use(express.json());

app.get("/", (req, res) => {
  res.render("signin");
});

app.get("/dashboard-page", (req, res) => {
  res.render("dashboard");
});

app.get("/projects-page", (req, res) => {
  db.projects.findAll()
    .then((projects) => {
      res.render("projects", { projects});
    })
    .catch((error) => {
      res.render("error", { error });
    });
});

app.get("/users-page", (req, res) => {
  res.render("users");
});

app.get("/reports-page", (req, res) => {
  res.render("reports");
});

app.get("/integrations-page", (req, res) => {
  res.render("integrations");
});

app.get("/projects-list", (req, res) => {
  db.projects.findAll()
    .then((projects) => {
      res.render("projects/list-items", { projects });
    })
    .catch((error) => {
      res.render("error", { error });
    });
});

app.post("/projects", (req, res) => {
  db.projects.create(req.body)
    .then(() => {
      res.send({ status: "OK" });
    })
    .catch((error) => {
      res.render("error", { error });
    });
});

app.delete("/projects/:id", (req, res) => {
  db.projects.destroy({id: req.params.id})
    .then(() => {
      res.send({ status: "OK" });
    })
    .catch((error) => {
      res.render("error", { error });
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
