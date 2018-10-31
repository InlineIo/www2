module.exports = (app) => {
  const db = app.get("db");
  app.post("/api/{{name}}", (req, res) => {
    db.{{name}}.create(req.body)
      .then(() => {
        res.send({ status: "OK" });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });

  app.delete("/api/{{name}}/:id", (req, res) => {
    db.{{name}}.destroy({
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