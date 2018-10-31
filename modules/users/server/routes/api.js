module.exports = (app) => {
  const db = app.get("db");
  app.post("/api/users", (req, res) => {
    db.users.create(req.body)
      .then(() => {
        res.send({ status: "OK" });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });

  app.delete("/api/users/:id", (req, res) => {
    db.users.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.send({ status: "OK" });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });
};