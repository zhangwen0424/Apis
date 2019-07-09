## package.json
*Thanks for http://javascript.ruanyifeng.com/nodejs/packagejson.html*  
项目根目录中一般有package.json文件，该文件定义了项目所需的各个模块，一级配置信息（名称，版本等），可通过npm install 命令根据配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境

示例：
```
{
  "name": "package.json",
  "version": "1.0.0",
  "description": "package.json example",
  "config" : { "port" : "8080" },
  "main": "index.js",
  "dependencies": {
    "wrappy": "^1.0.2",
    "wrap-ansi": "^2.1.0",
    "y18n": "^4.0.0",
    "_xtend@4.0.1@xtend": "^4.0.1",
    "yallist": "^3.0.3",
    "yargs": "^12.0.5",
    "yargs-parser": "^11.1.1",
    "xtend": "^4.0.1"
  },
  "devDependencies": {},
  "scripts": {
    "start": "echo start",
    "test": "echo test",
    "server": "node server.js"
  },
  "browser": {
    "tipso": "./node_modules/tipso/src/tipso.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/zhangwen0424/webpack.git"
  },
  "author": "zhangwen",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/zhangwen0424/webpack/issues"
  },
  "homepage": "https://github.com/zhangwen0424/webpack#readme"
}
```
* package.json 为一个json对象
* npm init 生成package.json
* npm install 根据package.json加载所需的模块
* npm install express --save 写入dependencies属性
* npm install express --save-dev 写入devDependencies属性

### script字段
指定了运行脚本命令的npm命令行缩写  
npm run test  
npm run start

### dependencies字段，devDependencies字段
dependencies字段指定了项目运行所依赖的模块，devDependencies指定项目开发所需要的模块。它们都指向一个对象。该对象的各个成员，分别由模块名和对应的版本要求组成，表示依赖的模块及其版本范围

### main字段
main字段指定了加载的入口文件，require('moduleName')就会加载这个文件。这个字段的默认值是模块根目录下面的index.js

### config 字段
config字段用于添加命令行的环境变量。
```
server.js

http
  .createServer(...)
  .listen(process.env.npm_package_config_port)

$ npm run server  //使用port
$ npm config set foo:port 80  //改变port
```

### browser字段
browser指定该模板供浏览器使用的版本。Browserify这样的浏览器打包工具，通过它就知道该打包那个文件。