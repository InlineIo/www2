const
  {
    apiErrors
  } = require("../../../../responses");
module.exports = (api, db) => {
  api.post("/projects", (req, res) => {
    db.projects.create(req.body)
      .then(() => {
        res.send({ status: "OK" });
      })
      .catch(apiErrors(req, res, 409));
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
      .catch(apiErrors(req, res, 409));
  });
};
