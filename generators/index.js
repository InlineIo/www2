#!/usr/bin/env node

const program = require("commander"),
  mod = require("./modules");

program.version("1.0.0")
  .usage();

program
  .command("module <name> <singular> <title> <description>")
  .action(mod.cmd(output));

program.parse(process.argv);

function output(txt) {
  console.log(txt);
}