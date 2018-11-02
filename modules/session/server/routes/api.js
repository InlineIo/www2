const {
  findUserByEmail,
  samePwd,
  createNewUser
} = require("../services");

module.exports = (api, db) => {
  api.post("/signin", (req, res) => {
    findUserByEmail(db, req.body.email)
      .then((user) => {
        if (!samePwd(user, req.body.password)) {
          res.status(404).send({
            errorCode: "NOT_FOUND"
          });
          return;
        }
        req.session.user = user;
        res.send({
          status: "OK"
        });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

  api.post("/signup", (req, res) => {
    if (req.body.password !== req.body.confirmPassword) {
      res.status(409)
        .send({
          errorCode: "PWD_NO_MATCH"
        });
      return;
    }

    findUserByEmail(db, req.body.email)
      .then((usr) => {
        if (usr) {
          res.status(409)
            .send({
              errorCode: "USR_EXISTS"
            });
        } else {
          db.organizations.create({
            name: req.body.organization
          })
            .then(createNewUser(db, req.body, "owner"))
            .then((user) => {
              req.session.user = user;
              res.send({status: "OK"});
            })
            .catch((error) => {
              if (error.name === "SequelizeUniqueConstraintError") {
                if (error.parent && error.parent.constraint === "users_email_key") {
                  res.status(409).send({
                    errorCode: "USR_EXISTS"
                  });
                  return;
                }
                if (error.parent && error.parent.constraint === "organizations_name_key") {
                  res.status(409).send({
                    errorCode: "ORG_EXISTS"
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
