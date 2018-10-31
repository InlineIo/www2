module.exports = (app) => {
  const db = app.get("db");

  app.get("/pages/reports", (req, res) => {
    res.render("reports");
  });
};