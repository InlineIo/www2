module.exports = {
  set(app) {
    require("./api")(app);
    require("./pages")(app);
  }
};