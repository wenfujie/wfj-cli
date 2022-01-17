/*
 * @Date: 2022-01-17 10:14:09
 * @LastEditors: wenfujie
 * @LastEditTime: 2022-01-17 17:12:42
 * @FilePath: /wfj-cli/lib/config/promote/creator.js
 */
const { tplPrefix } = require("../index");

exports.promotes = [
  {
    type: "list",
    message: "请选择项目类型",
    name: "proType",
    choices: [
      // {
      //   name: "PC",
      //   value: "pc",
      //   short: "PC"
      // },
      {
        name: "Mobile",
        value: "mobile",
        short: "Mobile"
      }
    ]
  },
  {
    type: "list",
    message: "请选Mobile端模板",
    name: "tpl",
    when(answer) {
      return answer.proType === "mobile";
    },
    choices: [
      {
        name: "H5活动页模板",
        value: {
          url: `${tplPrefix}/cli-template#main`,
          plugins: [
            {
              value: "router",
              message: "是否引入 vue-router ？(若只有单个页面，则无需引入)"
            },
            {
              value: "vuex",
              message: "是否引入 vuex？(若全局数据并不多，provide/inject 足矣)"
            },
            {
              value: "@wenfujie/vue-cli-plugin-i18n",
              message: "是否引入多语言 i18n ？"
            }
          ]
        },
        short: "H5活动页模板"
      }
      // {
      //   name: "小游戏模板",
      //   value: {
      //     url: `${tplPrefix}/dc-vizier-tpl-egret-game#master`
      //   },
      //   short: "小游戏模板"
      // }
    ]
  }
];
