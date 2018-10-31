#!/usr/bin/env node

const program = require("commander"),
  mod = require("./modules");

program.version("1.0.0")
  .usage();

program
  .command("modules <name>")
  .action(mod.cmd(output)(name, cmd));

program.parse(process.argv);