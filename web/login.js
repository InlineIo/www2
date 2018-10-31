module.exports = (app) => {
  const db = app.get("db");

  app.get("/", (req, res) => {
    res.render("signin");
  });
};