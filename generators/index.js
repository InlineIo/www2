#!/usr/bin/env node

const program = require("commander"),
  mod = require("./modules");

program.version("1.0.0")
  .usage();

program
  .command("module <name>")
  .option("-s --singular", "Singular name for the resource")
  .option("-t --title", "The title to show in the page")
  .option("-d --description", "The description or tagline for the crud page")
  .action(mod.cmd(output));

program.parse(process.argv);

function output(txt) {
  console.log(txt);
}