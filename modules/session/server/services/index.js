const bcrypt = require("bcrypt");
module.exports = {
  findUserByEmail(db, email) {
    return db.users.findOne({
      where: {
        email
      },
      attributes: ["id", "pwd", "salt"]
    });
  },
  createNewUser(db, user, role) {
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
  },
  samePwd(user, pwd) {
    return user &&
      user.pwd === bcrypt.hashSync(pwd, user.salt);
  }
};
