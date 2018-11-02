const express = require("express"),
  session = require("./session-store"),
  api = express();

api.use(express.json());
session.addSession(api);

module.exports.api = api;
