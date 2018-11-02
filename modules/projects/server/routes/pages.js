const {authorizeWeb} = require("../../../../session-store"),
  {allProjectsForUser} = require("../services");

module.exports = (app, db) => {
  const payload = {
    jsApp: "../projects.js"
  };

  app.get("/pages/projects", authorizeWeb([]), (req, res) => {
    allProjectsForUser(db, req.session.user)
      .then((projects) => {
        payload.projects = projects;
        res.render("../modules/projects/server/views/list.ejs", payload);
      })
      .catch((error) => {
        res.render("error", {error});
      });
  });

  app.get("/content/projects", authorizeWeb([]), (req, res) => {
    allProjectsForUser(db, req.session.user)
      .then((projects) => {
        payload.projects = projects;
        res.render("../modules/projects/server/views/components/list-items", payload);
      })
      .catch((error) => {
        res.render("error", {error});
      });
  });
};
