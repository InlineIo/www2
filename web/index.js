module.exports =  {
  set(app) {
    require("./dashboard")(app);
    require("./integrations")(app);
    require("./projects")(app);
    require("./reports")(app);
    require("./users")(app);
  }
};