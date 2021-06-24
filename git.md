# git命令总结


## 〉生成SSH(进入根目录)
 $ ssh-keygen -t ras -C "email@xxx"
将生成的SSH key复制到文本框中即可（title默认为邮箱名）
pbcopy < ~/.ssh/id_ed25519.pub //拷贝 id_rsa.pub 文件到github
〉设置用户名
$ git config --global user.name "cc"
$ git config --global user.email "cc@xx"
git config --list // 检查已有的配置信息
git config user.name //查看特定配置信息
〉 初始化当前目录的项目
git init
〉在该目录下新建一个文件，然后查看，将修改添加到暂存区
echo "# test" >> README.md
git add *  //将工作区所有修改添加到暂存区
git add .  //将工作区所有修改添加到暂存区
git add filename //将指定文件添加到暂存区
git status  //列出变更文件
〉将暂存区修改添加到本地仓库
git commit -m '备注信息'
〉创建仓库，并将上诉改动push到远程
git remote add origin https://github.com/qianduanxiaoc/test.git
git push -u origin master
注：在这里遇到一个问题：每次push都要输入用户名和密码，原因是https方式 push，解决方法如下
git remote rm origin   //移除
git remote add origin git@github.com:gitname/test.git       //添加
此后就不用再输入用户名和密码了
〉从远程clone项目
git clone url
〉放弃暂存区修改
git checkout -- filename  //放弃暂存区修改（修改不在）
git rm --cached filename  //放弃add（修改还在，但产生一条delete记录）
git reset HEAD filename   //同上（没有delete记录）
〉暂存暂存区修改切换其他分支
git stash 把现有的修改藏起来
git stash save “desc” 把现有的修改藏起来，并且添加一个注释
git stash list 查看所有藏起来的
git stash pop stash@{index} 删除 最近/指定 一个藏起来的，并还原回来代码
git stash apply stash@{index} 应用藏起来的不删除stash 列表
git stash drop shash@{index} 删除藏起来的不还原代码
git stash clear 清除所有修改
git stash show shash@{index} 查看修改了什么文件
git stash show -p shash@{index} 查看修改了什么文件,里面修改了什么内容

〉分支操作
/*查看分支*/
git branch     //所有本地分支
git branch -r  //所有远程分支
git branch -a  //所有远程分支和本地分支
/*创建分支*/ 
git branch branchName //留在当前分支
git checkout -b branchName //创建并切换分支
git branch --set-upstream-to=<remote>/branchName //建立本地分支与远程分支的追踪关系git push -u origin master
git branch --track branchName [remote branch] //新建一个分支，并与远程建立追踪关系 
git checkout branchName //切到指定分支 
git checkout -b 本地分支名 origin/远程分支名  //从远程仓库里拉取一条本地不存在的分支时：
/*分支合并*/ 
git pull origin branch //取回远程更新并与本地分支合并 
git fetch origin branch //取回远程更新 
git merge branch //合并指定分支到当前分支(产生提交记录) 
git rebase branch //合并指定分支到当前分支(不产生提交记录，比较适合有强迫症的) 
git cherry-pick commitId //将与commitId对应的提交合进当前分支
〉追踪代码
.gitignore 忽略提交代码 .gitignore文件只能作用于 Untracked Files，也就是那些从来没有被 Git 记录过的文件（自添加以后，从未 add 及 commit 过的文件）
git add -f file  之前停止追踪的目录再恢复追踪
命令忽略文件
修改又不能写进.gitignore中，就需要通过命令了几，非修改.gitignore。
忽略： $ git update-index --assume-unchanged /path/to/file

取消忽略： $ git update-index --no-assume-unchanged /path/to/file


## 文件忽略
项目中一些需要在本地修改，又不能写进.gitignore中，就需要通过命令了
百度搜索了一下，几乎前篇一律的修改.gitignore。
忽略
$ git update-index --assume-unchanged /path/to/file
取消忽略
$ git update-index --no-assume-unchanged /path/to/file
