const express = require("express"),
  api = express();

api.use(express.json());


module.exports.api = api;