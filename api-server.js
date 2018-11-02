const express = require("express"),
  session = require("./session-store"),
  docs = require("./api-docs"),
  api = express();

api.use(express.json());
api.get("/api-docs", docs);
session.addSession(api);

module.exports.api = api;
