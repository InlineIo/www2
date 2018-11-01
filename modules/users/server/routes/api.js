module.exports = (api, db) => {
  api.post("/users", (req, res) => {
    db.users.create(req.body)
      .then(() => {
        res.send({ status: "OK" });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });

  api.delete("/users/:id", (req, res) => {
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