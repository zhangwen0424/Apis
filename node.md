# node

[toc]

## mac安装
1、在官方下载网站下载 pkg 安装包，直接点击安装即可。
2、使用 brew 命令来安装：
brew install node


## node工具模块
- OS模块
- Path模块
- Net模块
- DNS模块
- Domain模块


#### Path模块
***path.resolve([...paths])***
通过解析一系列字符串，最终返回一个绝对路径;  
解析的方式:
- 从右向左，直到拼成一个绝对路径就自动停止。
- 如果全部路径都拼完了，还没有形成绝对路径，那就把当前路径加上
- 如果没有参数，path.resolve()返回当前路径
- 若以 / 开头，不会拼接到前面的路径；
- 若以 ../ 开头，拼接前面的路径，但是不含前面一节的最后一层路径；
- 若以 ./ 开头 或者没有符号 则拼接前面路径；
```
console.log(path.resolve())      // returns /workspace/demo
console.log(path.resolve(''))     // returns /workspace/demo
console.log(path.resolve(__dirname)) // returns /workspace/demo
console.log(path.resolve('/img/books', '/net'))  // returns '/net'
console.log(path.resolve('img/books', '/net'))  // returns '/net'
console.log(path.resolve('img/books', './net'))  // returns '/workspace/demo/img/books/net'
console.log(path.resolve('/img/books', './net'))  // returns '/img/books/net'
console.log(path.resolve('/img/books', 'net'))   // returns '/img/books/net'
console.log(path.resolve('/img/books', '../net'))     // returns '/img/net'
console.log(path.resolve('src','/img/books', '../net'))  // returns '/img/net'
console.log(path.resolve('src','./img/books', '../net'))  // returns '/workspace/demo/src/img/net'
console.log(path.resolve('src','img/books', '../net'))   // returns '/workspace/demo/src/img/net'
```
