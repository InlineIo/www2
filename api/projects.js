module.exports = (app) => {
  const db = app.get("db");
  app.post("/api/projects", (req, res) => {
    db.projects.create(req.body)
      .then(() => {
        res.send({ status: "OK" });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });

  app.delete("/api/projects/:id", (req, res) => {
    console.log("ID:", req.params.id);
    db.projects.destroy({
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