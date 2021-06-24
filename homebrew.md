# Homebrew

## 一、Homebrew是什么  
Mac 系统下类似于在Ubuntu的终端上通过 apt-get的软件包管理器 – Homebrew

Homebrew是一款Mac OS平台下的软件包管理工具，拥有安装、卸载、更新、查看、搜索等很多实用的功能。简单的一条指令，就可以实现包管理，而不用你关心各种依赖和文件路径的情况，十分方便快捷。  
援引官方的一句话：又提示缺少套件啦？别担心，Homebrew 随时守候。Homebrew —— OS X 不可或缺的套件管理器。

Homebrew 并不是什么软件包都能装，它只是能装一些系统缺省的软件包，例如：wget、nginx、mysql等等。不过随着 homebrew0.9版 新加了 tap 操作，支持安装第三方数据源的软件包，以后支持安装的软件包会更多、更丰富。

## 二、Homebrew安装

1. 要求  
Intel CPU  
OS X 10.9 or highers  
Xcode命令行工具  
$ xcode-select --install  
支持shell (sh或者bash)  

2. 安装和卸载  
安装  
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
卸载  
$ cd `brew --prefix`
$ rm -rf Cellar
$ brew prune
$ rm `git ls-files`
$ rm -r Library/Homebrew Library/Aliases Library/Formula Library/Contributions
$ rm -rf .git
$ rm -rf ~/Library/Caches/Homebrew

## 三、Homebrew基本使用

- 安装任意包 $ brew install <packageName>  
示例：$ brew install node //安装node  
- 卸载任意包 $ brew uninstall <packageName>  
示例：$ brew uninstall git //卸载git  
- 查询可用包 $ brew search <packageName>  
- 查看已安装包列表 $ brew list  
- 查看任意包信息 $ brew info <packageName>
- 更新Homebrew $ brew update
- 查看Homebrew版本 $ brew -v
- Homebrew帮助信息 $ brew -h


