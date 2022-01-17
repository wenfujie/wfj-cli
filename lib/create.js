/*
 * @Date: 2022-01-17 09:54:00
 * @LastEditors: wenfujie
 * @LastEditTime: 2022-01-17 15:32:54
 * @FilePath: /wfj-cli/lib/create.js
 */
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const validateProjectName = require("validate-npm-package-name");
const emoji = require("node-emoji");
const { promotes } = require("./config/promote/creator.js");
const { log } = require("./util/logger");
const downloadRepo = require("./util/download.js");
const { coverPkg } = require("./util/pkg");
const pluginAction = require("./util/plugin");

class Creator {
  constructor(proName) {
    this.proName = proName;
  }

  /**
   * @description: 校验项目名称格式是否正确
   * @param {*} name 项目名称
   */
  validatePackageName(name) {
    if (!validateProjectName(name).validForNewPackages) {
      log(chalk.yellow(`${emoji.get("x")} 错误的项目名: "${name}"`));
      process.exit(1);
    }
  }

  /**
   * @description: 清除重复目录
   * @param {*} proPath 目录路径
   * @return {*}
   */
  async clearRepeatDir(proPath) {
    if (fs.existsSync(proPath)) {
      const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: `项目 ${chalk.cyan(proPath)} 已存在. 请选择操作:`,
          choices: [
            { name: "重新创建", value: "overwrite" },
            { name: "取消创建", value: false }
          ]
        }
      ]);
      if (!action) {
        process.exit(1);
      } else if (action === "overwrite") {
        log(`\n 旧项目 ${chalk.cyan(proPath)} 清理中...\n`);
        fs.rmSync(proPath, { recursive: true });
        log(`${chalk.green("清理完成, 开始创建 ... \n")}`);
      }
    }
  }

  /**
   * @description: 根据用户选择添加插件
   * @param {*} plugins
   * @param {*} context 上下文
   */
  async addPluginsByOperator(plugins, context) {
    for (const plugin of plugins) {
      if (typeof plugin !== "string") {
        const { message, value } = plugin;
        const promotes = [
          {
            type: "confirm",
            message,
            name: "isInstallPlugin",
            default: false
          }
        ];
        const { isInstallPlugin } = await inquirer.prompt(promotes);
        if (isInstallPlugin) {
          await pluginAction("add", value, context);
        }
      } else {
        await pluginAction("add", plugin, context);
      }
    }
  }
}

async function createPro(proName) {
  const cwd = process.cwd();
  // 模板下载路径
  const targetDir = path.resolve(cwd, proName || ".");

  const creator = new Creator(proName);
  // 校验项目名称格式
  creator.validatePackageName(proName);
  try {
    // 校验路径是否已存在
    await creator.clearRepeatDir(targetDir);
  } catch (err) {}

  log(chalk.white("\n 项目创建开始 ... \n"));

  // 模板下载选项
  const {
    tpl: { url, plugins }
  } = await inquirer.prompt(promotes);

  try {
    // clone 代码
    await downloadRepo(url, proName);
    // 修改 pkg 字段
    await coverPkg(proName, targetDir);
    // 添加插件
    if (plugins && plugins.length) {
      creator.addPluginsByOperator(plugins, targetDir);
    }
  } catch (err) {
    log(err);
  }
}

module.exports = (...args) => {
  const [proName] = args;
  createPro(proName);
};
