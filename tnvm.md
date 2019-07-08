## node 版本管理工具

### mac安装
curl https://raw.githubusercontent.com/aliyun-node/tnvm/master/install.sh | bash

### 常用命令
* 列出本地所有可用的node版本: tnvm ls node
* 列出所有可用的node版本: tnvm ls-remote node
* 安装某个node版本: tnvm install node-v4.2.6
* 切换node版本: tnvm use node-v4.2.6
* 当前使用的node版本: tnvm current node