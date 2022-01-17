/*
 * @Date: 2022-01-17 10:54:15
 * @LastEditors: wenfujie
 * @LastEditTime: 2022-01-17 15:46:41
 * @FilePath: /wfj-cli/lib/util/download.js
 */
const download = require("download-git-repo");

module.exports = (repoAddr, proName) =>
  new Promise((resolve, reject) => {
    download(
      repoAddr,
      proName,
      {
        clone: true
      },
      (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
