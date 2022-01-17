#!/usr/bin/env node
/*
 * @Date: 2022-01-17 09:44:51
 * @LastEditors: wenfujie
 * @LastEditTime: 2022-01-17 14:27:15
 * @FilePath: /wfj-cli/bin/wfj-create.js
 */

const program = require('commander')
const createProject = require('../lib/create')

program.usage('<project-name>')

program.parse(process.argv)

if (program.args.length < 1) {
  program.help()
} else {
  const [proName] = program.args
  createProject(proName)
}