module.exports = {
  set({api, web, db}) {
    require("./api")(api, db);
    require("./pages")(web, db);
  }
};
