/*
 * @Date: 2022-01-17 14:30:28
 * @LastEditors: wenfujie
 * @LastEditTime: 2022-01-17 14:54:30
 * @FilePath: /wfj-cli/lib/util/pkg.js
 */
const fs = require("fs");
const path = require("path");
const readPkg = require("read-pkg");
const promisify = require('util').promisify
const writeFile = promisify(fs.writeFile)

// 获取package.json
exports.resolvePkg = function (context) {
  if (fs.existsSync(path.join(context, "package.json"))) {
    return readPkg.sync({ cwd: context });
  }
  return {};
};

// 重写package.json
exports.coverPkg = async function (proName, context) {
  const pkg = {
    ...exports.resolvePkg(context),
    name: proName,
    version: "0.1.0",
    private: true
  };
  const pkgPath = path.join(context, 'package.json')
  const pkgData = JSON.stringify(pkg, null, 2)
  await writeFile(pkgPath, pkgData, 'utf-8')
}