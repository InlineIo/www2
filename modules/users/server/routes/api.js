const
  {
    apiErrors
  } = require("../../../../responses");
module.exports = (api, db) => {
  api.get("/users", (req, res) => {
    res.send(["users"]);
  });

  api.post("/users", (req, res) => {
    db.users.create(req.body)
      .then(() => {
        res.send({ status: "OK" });
      })
      .catch(apiErrors(req, res, 409));
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
      .catch(apiErrors(req, res, 409));
  });
};