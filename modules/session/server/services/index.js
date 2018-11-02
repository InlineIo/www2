const bcrypt = require("bcrypt");
function findUserByEmail(db, email) {
  return db.users.findOne({
    where: {
      email
    },
    attributes: ["id", "pwd", "salt"]
  });
}

function samePwd(user, pwd) {
  return user &&
    user.pwd === bcrypt.hashSync(pwd, user.salt);
}

function createNewUser(db, user, role) {
  return (organization) => {
    const salt = bcrypt.genSaltSync(),
      newUser = {
        email: user.email,
        salt,
        organizationsId: organization.id,
        role,
        pwd: bcrypt.hashSync(user.password, salt)
      };
    return db.users.create(newUser);
  };
}

module.exports = {
  signIn(db, data) {
    return findUserByEmail(db, data.email)
      .then((user) => {
        if (!samePwd(user, data.password)) {
          const e = new Error();
          e.errorCode = "NOT_FOUND";
          throw e;
        }
        return user;
      });
  },
  createNewOrg(db, data) {
    if (data.password !== data.confirmPassword) {
      return Promise.reject({
        errorCode: "PWD_NO_MATCH"
      });
    }
    return findUserByEmail(db, data.email)
      .then((usr) => {
        if (usr) {
          const e = new Error();
          e.errorCode = "USR_EXIST";
          throw e;
        }
        return db.organizations.create({
          name: data.organization
        })
          .then(createNewUser(db, data, "owner"))
          .catch((error) => {
            if (error.name === "SequelizeUniqueConstraintError") {
              if (error.parent && error.parent.constraint === "users_email_key") {
                const e = new Error();
                e.errorCode = "USR_EXIST";
                throw e;
              }
              if (error.parent && error.parent.constraint === "organizations_name_key") {
                const e = new Error();
                e.errorCode = "ORG_EXIST";
                throw e;
              }
            }
            throw error;
          });
      });
  }
};
