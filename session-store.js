const session = require("express-session"),
  RedisStore = require("connect-redis")(session);

module.exports = {
  addSession(app) {
    app.use(session({
      store: new RedisStore(
        {
          host: "localhost",
          port: 6379,
          pass: ""
        }
      ),
      name: "__inline__cid__",
      secret: "sadfnuw skakcr9e8w fskjdhf;ku  gh",
      resave: false,
      sameSite: true,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        secure: app.get("env") === "production"
      }
    }));
  },
  authorizeWeb(roles) {
    return (req, res, next) => {
      // No session, not logged in
      if (!req.session.user) {
        res.redirect("/");
        return;
      }
      if (!Array.isArray(roles)) {
        throw new Error("Authorize needs roles and it should be an array");
      }
      // Access to all roles denoted by an empty array
      if (roles.length === 0) {
        next();
        return;
      }
      if (roles.indexOf(req.session.user.role) > -1) {
        next();
        return;
      }
      res.redirect("/pages/unauthorized");
    };
  }
};
