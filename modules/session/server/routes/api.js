module.exports = (app) => {
  const db = app.get("db");
  app.post("/api/signin", (req, res) => {
    db.usignin.create(req.body)
      .then(() => {
        res.send({ status: "OK" });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });

  app.delete("/api/signin/:id", (req, res) => {
    db.usignin.destroy({
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