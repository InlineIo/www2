module.exports = (app) => {
  const db = app.get("db"),
    payload = {
      jsApp: "../{{name}}.js"
    };

  app.get("/pages/{{name}}", (req, res) => {
    db.{{name}}.findAll()
      .then(({{name}}) => {
        payload.{{name}} = {{name}};
        res.render("../modules/{{name}}/server/views/list.ejs", payload);
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });

  app.get("/content/{{name}}", (req, res) => {
    db.{{name}}.findAll()
      .then(({{name}}) => {
        payload.{{name}} = {{name}};
        res.render("../modules/{{name}}/server/views/components/list-items", payload);
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });
};