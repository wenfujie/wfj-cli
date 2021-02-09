#!/usr/bin/env node
// 上一行作用：使用env来找到node，并使用node来作为程序的解释程序

/**
 * 构建自己的CLI工具
 * 1.从 github 上拉取代码仓库
 */
// 异步方式转化为promise形式
const { promisify } = require('util')
// 显示进程进度
const ora = require('ora')
const { program } = require('commander')
const downloadGitRepo = require('download-git-repo')
// clone 的仓库
const REPO_DESC = 'github:wenfujie/search-360-bd'

// 主入口
function main() {
  const cb = (filderName) => {
    clone(REPO_DESC, filderName)
  }
  registerCommand(cb)
}

main()

/**
 * 注册指令
 * @param {function} callback 执行指令的回调函数
 */
function registerCommand(callback) {
  program.version('0.0.1')

  program
    .command('init')
    .arguments('<filderName>')
    .description('脚手架初始化的描述')
    .action((filderName) => {
      typeof callback && callback(filderName)
    })

  program.parse(process.argv)
}

/**
 * 下载git仓库代码
 * @param {string} repo git仓库地址
 * @param {string} repo 下载要存放目录
 */
async function clone(repo, desc) {
  const down = promisify(downloadGitRepo)
  const downProgress = ora(`下载${repo}中...`)
  await down(repo, desc)
    .then((res) => {
      downProgress.succeed('下载成功')
    })
    .catch((err) => {
      downProgress.failed()
    })
}
