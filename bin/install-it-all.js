#!/usr/bin/env node

const startTime = process.hrtime()
const program = require("commander")
const { version } = require("../package.json")
const InstallItAll = require("../install-it-all-core")

program
  .version(version, "-v --version")
  .usage("install-it-all [path/to/project/manifest.json]")
  .parse(process.argv)

InstallItAll(program.args, process.cwd(), startTime)