module.exports = (api, db) => {
  api.post("/signup", (req, res) => {
    const bcrypt = require("bcrypt");

    if (req.body.password !== req.body.confirmPassword) {
      res.status(409)
        .send({
        errorCode: "PWD_NO_MATCH"
      });
      return;
    }

    db.users.findOne({
      where: { email: req.body.email },
      attributes: ['id']
    }).then((usr) => {
      if (usr) {
        res.status(409)
          .send({
            errorCode: "USR_EXISTS",
            errors: [usr]
          });
      } else {
        db.organizations.create({ name: req.body.organization })
          .then((org) => {
            const newUser = req.body;
            newUser.salt = bcrypt.genSaltSync();
            newUser.organizationsId = org.id;
            newUser.pwd = bcrypt.hashSync(newUser.password, newUser.salt);
            return db.users.create(newUser)
          })
          .then(() => {
            res.send({ status: "OK" });
          })
          .catch((error) => {
            if (error.name === "SequelizeUniqueConstraintError") {
              if (error.parent && error.parent.constraint === "users_email_key") {
                res.status(409).send({
                  errorCode: "USR_EXISTS",
                  errors: error.errors
                });
                return
              }
              if (error.parent && error.parent.constraint === "organizations_name_key") {
                res.status(409).send({
                  errorCode: "ORG_EXISTS",
                  errors: error.errors
                });
                return;
              }
            }
            res.status(500).send(error);
          });
      }
    });
  });
};