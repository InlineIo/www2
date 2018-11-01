const express = require("express"),
  db = require("./models"),
  webRoutes = require("./web"),
  {api} = require("./api-server"),
  {web} = require("./web-server"),
  app = express(),
  options = {
    db,
    web,
    api
  },
  port = process.env.PORT || 9000;

require("./modules/session/server/routes").set(options);
require("./modules/projects/server/routes").set(options);
require("./modules/users/server/routes").set(options);
webRoutes.set(web);

app.use("/", web);
app.use("/api", api);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
