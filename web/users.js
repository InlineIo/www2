module.exports = (app) => {
  const db = app.get("db");

  app.get("/pages/users", (req, res) => {
    res.render("users");
  });
};