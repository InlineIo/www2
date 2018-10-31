module.exports = (app) => {
  const db = app.get("db");

  app.get("/pages/integrations", (req, res) => {
    res.render("integrations");
  });
};