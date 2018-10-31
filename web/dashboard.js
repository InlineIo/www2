module.exports = (app) => {
  const db = app.get("db");

  app.get("/pages/dashboard", (req, res) => {
    res.render("dashboard");
  });
};