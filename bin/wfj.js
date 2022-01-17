#!/usr/bin/env node

/*
 * @Date: 2022-01-17 17:55:14
 * @LastEditors: wenfujie
 * @LastEditTime: 2022-01-17 17:55:36
 * @FilePath: /wfj-cli/bin/wfj.js
 */
const program = require("commander");

program
  .version(require("../package").version)
  .usage("<command> [options]")
  .command("create [options] <app-name>", "Create a new project")
  .command(
    "add [options] <plugin> [pluginOptions]",
    " install a plugin and invoke its generator in an already created project"
  )
  .command(
    "invoke [options] <plugin> [pluginOptions]",
    " invoke the generator of a plugin in an already created project"
  );

// 解析命令行参数
program.parse(process.argv);
