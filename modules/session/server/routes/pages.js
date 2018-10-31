module.exports = (app, config) => {
  const db = app.get("db"),
    payload = {
      jsApp: `../${config.moduleFolder}.js`
    };

  app.get("/", (req, res) => {
    res.render(`../modules/${config.moduleFolder}/server/views/index.ejs`, payload);
  });
};