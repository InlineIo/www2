module.exports = (app) => {
  const db = app.get("db");

  app.get("/pages/projects", (req, res) => {
    db.projects.findAll()
      .then((projects) => {
        res.render("projects", { projects });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });

  app.get("/content/projects", (req, res) => {
    db.projects.findAll()
      .then((projects) => {
        res.render("projects/list-items", { projects });
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });
};