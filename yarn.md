<!--
 * @Date: 2021-09-10 15:48:52
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-09-23 11:35:18
 * @FilePath: /project/apis/yarn.md
-->
#yarn

[官网](https://yarnpkg.com/cli/config)

## 安装

安装：brew install yarn  
更新：brew upgrade yarn 

**升级 Yarn 本身**
yarn set version latest  
yarn set version from sources  


## 使用

**初始化一个新项目**
yarn init

**添加依赖包**
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]

**将依赖项添加到不同依赖项类别中**
分别添加到 devDependencies、peerDependencies 和 optionalDependencies 类别中：
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional

**升级依赖包**
yarn up [package]
yarn up [package]@[version]
yarn up [package]@[tag]

**移除依赖包**
yarn remove [package]

**安装项目的全部依赖**
yarn
或者
yarn install 