# npm源管理器-nrm

## 一、什么是nrm
nrm 是一个 npm 源管理器，允许你快速地在 npm源间切换。
npm默认情况下是使用npm官方源（使用npm config ls命令可以查看），在国内用这个源肯定是不靠谱的，一般我们都会用淘宝npm源：https://registry.npm.taobao.org/，修改源的方式也很简单，在终端输入：  
npm set registry https://registry.npm.taobao.org/  
再npm config ls查看，已经切换成功。  

## 二、nrm安装
npm install -g nrm

## 三、nrm使用
1、查看可选源（带*号即为当前使用源）  
nrm ls

2、查看当前使用源  
nrm current

3、切换源  
nrm use <registry>  //registry为源名。  
比如： 
nrm use taobao //切换为taobao源

4、添加源  
nrm add <registry> <url> //registry为源名，url为源地址  
比如：添加一个公司私有的npm源，源地址为：http://192.168.22.11:8888/repository/npm-public/，源名为cpm。  
nrm add cpm http://192.168.22.11:8888/repository/npm-public/

5、删除源  
nrm del <registry> //registry为源名
比如：
nrm del cpm //删除刚才添加的cpm源

6、测试源速度（即响应时间）
nrm test <registry> //registry为源名
比如：测试官方源和淘宝源的响应时间
nrm test npm  
nrm test taobao  