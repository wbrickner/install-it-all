#!/usr/bin/env node

const startTime = process.hrtime()
const program = require("commander")
const { version } = require("../package.json")
const InstallItAll = require("../install-it-all-core")

program
  .version(version, "-v --version")
  .usage("[path/to/project/manifest.json]")
  .option("--no-update", "Prevent updating the dependencies (respects semver string)")
  .option("--no-dev", "Prevent updating / installing dev dependencies")
  .option("--only-dev", "Only update / install dev dependencies")
  .parse(process.argv)

InstallItAll(program.args, process.cwd(), program, startTime)