/*
 * @Author: cheesekun
 * @Date: 2021-01-29 09:17:49
 * @LastEditors: wenfujie
 * @LastEditTime: 2022-01-17 15:29:44
 * @FilePath: /wfj-cli/lib/util/plugin.js
 */
const excuteCmd = require("./excuteCmd");
// const { npmRegistry } = require('./config')

async function pluginAction(action, plugin, context = process.cwd()) {
  return await excuteCmd(
    "vue",
    [action, plugin, ""],
    context,
    (buffer) => {
      process.stdout.write(buffer.toString());
    },
    (buffer) => {
      process.stdout.write(buffer.toString());
    }
  );
}

module.exports = (...args) => {
  const [action, plugin, context] = args;
  return pluginAction(action, plugin, context);
};
