const fs = require("fs");

module.exports = {
  cmd(output) {
    return (name, cmd) => {
      output("Finished");
    };
  }
}