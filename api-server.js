const express = require("express"),
  session = require("./session-store"),
  createMiddleware = require("swagger-express-middleware"),
  api = express(),
  path = require("path"),
  swaggerFile = path.join(__dirname, "InlineApi.yaml");

createMiddleware(swaggerFile, api, (_, middleware) => {
  api.use(
    middleware.metadata(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest(),
    middleware.mock()
  );
});
api.use(express.json());
session.addSession(api);

module.exports.api = api;
