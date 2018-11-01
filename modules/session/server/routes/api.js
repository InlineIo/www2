module.exports = (app) => {
  const db = app.get("db");
  app.post("/api/signup", (req, res) => {
    const bcrypt = require("bcrypt");
    if (req.body.password !== req.body.confirmPassword) {
      res.status(409)
        .send({
        errorCode: "PWD_NO_MATCH"
      });
      return;
    }
    db.organizations.create({name: req.body.organization})
      .then((org) => {
        const newUser = req.body;
        newUser.salt = bcrypt.genSaltSync();
        newUser.orgId = org.id;
        newUser.pwd = bcrypt.hashSync(newUser.password, newUser.salt);
        return db.users.create(newUser)
      })
      .then(() => {
        res.send({ status: "OK" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  });
};