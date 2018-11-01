module.exports = (app, db) => {
  const payload = {
      jsApp: "../users.js"
    };

  app.get("/pages/users", (req, res) => {
    db.users.findAll()
      .then((users) => {
        payload.users = users;
        res.render("../modules/users/server/views/list.ejs", payload);
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });

  app.get("/content/users", (req, res) => {
    db.users.findAll()
      .then((users) => {
        payload.users = users;
        res.render("../modules/users/server/views/components/list-items", payload);
      })
      .catch((error) => {
        res.render("error", { error });
      });
  });
};