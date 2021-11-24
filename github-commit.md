### commit a project to github

English
1. register a github account.
2. new reponsitory at github homepage
3. write some information and create
4. clone the ssh [url]
5. in your computer
mkdir my-project
cd my-project
git remote add origin [url]

Chinese
1. 注册自己的github帐号
2. 新建github仓库
3. 填入项目基本信息并创建
4. 拷贝新建的项目中的ssh地址
5. 在电脑命令行执行
mkdir my-project  //创建本地项目文件夹
cd my-project     //进入项目文件中
git remote add origin [url] //当前项目关联到github项目目录



## 本地已经存在的项目推送到github上

进入本地项目目录
git init  
git add .  
git commit -m '备注'  
git remote add origin 仓库地址
git push

