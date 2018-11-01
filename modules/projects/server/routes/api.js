module.exports = (api, db) => {
  api.post("/projects", (req, res) => {
    db.projects.create(req.body)
      .then(() => {
        res.send({ status: "OK" });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });

  api.delete("/projects/:id", (req, res) => {
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