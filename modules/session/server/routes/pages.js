const {
  authorizeWeb,
  closeSessionWeb
} = require("../../../../session-store");

module.exports = (app) => {
  const payload = {
    jsApp: "../session.js"
  };

  app.get("/", (req, res) => {
    res.render("../modules/session/server/views/index.ejs", payload);
  });

  app.get("/signout", authorizeWeb([]), closeSessionWeb);

  app.get("/content/session/signin", (req, res) => {
    res.render("../modules/session/server/views/components/signin.ejs", payload);
  });

  app.get("/content/session/signup", (req, res) => {
    res.render("../modules/session/server/views/components/signup.ejs", payload);
  });
};
