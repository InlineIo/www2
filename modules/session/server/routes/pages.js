const { authorizeWeb } = require("../../../../session-store");

module.exports = (app) => {
  const payload = {
    jsApp: "../session.js"
  };

  app.get("/", (req, res) => {
    res.render("../modules/session/server/views/index.ejs", payload);
  });

  app.get("/signout", authorizeWeb([]), (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });

  app.get("/content/session/signin", (req, res) => {
    res.render("../modules/session/server/views/components/signin.ejs", payload);
  });

  app.get("/content/session/signup", (req, res) => {
    res.render("../modules/session/server/views/components/signup.ejs", payload);
  });
};
