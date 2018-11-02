const fs = require("fs"),
  file = fs.readFileSync(`${__dirname}/openapi.json`);

module.exports = (req, res) => {
  res.send(file.toString());
};
