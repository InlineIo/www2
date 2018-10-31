const config = require("../../config.json");
module.exports = {
  set(app) {
    require("./api")(app, config);
    require("./pages")(app, config);
  }
};