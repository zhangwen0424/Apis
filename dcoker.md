# Docker

[toc]

## docker 镜像加速
mac  
任务栏点击 Docker for mac 应用图标-> Perferences...-> Daemon-> Registrymirrors。在列表中填写加速器地址 https://registry.docker-cn.com 。修改完成之后，点击 Apply&Restart 按钮，Docker 就会重启并应用配置的镜像地址了。
检查加速器是否生效  
```
$ docker info
Registry Mirrors:
    https://registry.docker-cn.com/
```

## docker容器的使用

- 查看docker客户端所有命令选项/查看具体使用
```
docker  
docker bulid --help  
```

- 获取镜像
```
docker pull ubuntu
```
- 查看容器
```
docker ps #查看正在运行的容器
```

- 查看所有容器  
```
docker ps -a
```

- 查看容器内部运行的进程
```
docker top ubuntu-test
```

- 启动容器
```
docker run -it ubuntu /bin/bash  
-i 交互式操作
-t 终端
ubuntu ubuntu镜像
/bin/bash 放在镜像后的命令，退出终端，直接输入exit
```

- 启动已停止运行的容器
```
启动容器  
docker start [container id]
```

- 后台运行docker
```
docker run -itd --name ubuntu-test ubuntu /bin/bash  
-d指定容器运行模式  
```

- 停止容器
```
docker stop [container id]
```

- 进入容器
```
docker attach [container id]  
或者
docker exec [container id] //退出容器，不会导致容器停止
```

- 导出容器
```
docker export [container id] > ubuntu.tar //导出容器快照到本地文件ubuntu.tar
```

- 导入容器
```
cat docker/ubuntu.tar | docker import - test/ubuntu:v1
或者
docker import http://example.com/exampleimage.tgz example/imagerepo
```

- 删除容器
```
docker rm -f [container id]
docker container prune  #清理掉所有处于终止状态的容器
```


## docker镜像

- 查看本地主机镜像
```
docker images

REPOSITORY：表示镜像的仓库源
TAG：镜像的标签
IMAGE ID：镜像ID
CREATED：镜像创建时间
SIZE：镜像大小
```

- 查找镜像
从 Docker Hub 网站来搜索镜像，Docker Hub 网址为： https://hub.docker.com/  
```
docker search httpd
```

- 获取新镜像
当我们在本地主机上使用一个不存在的镜像时 Docker 就会自动下载这个镜像。  
```
docker pull ubuntu:13.10
```

- 构建镜像
该命令会在当前目录下寻找Dockerfile文件，并自动完成构建。
```
docker build -t webapp . 
-t webapp 表示给构建完成的镜像取一个名字
```

- 创建镜像
当我们从 docker 镜像仓库中下载的镜像不能满足我们的需求时，我们可以通过以下两种方式对镜像进行更改。  
1、从已经创建的容器中更新镜像，并且提交这个镜像  
2、使用 Dockerfile 指令来创建一个新的镜像  

首先创建容器  
docker run -t -i ubuntu:15.10 /bin/bash  

方式1:更新镜像  
```
a.在运行容器中使用apt-get update命令更新后，使用exit退出容器
b.提交容器副本
docker commit -m="has update" -a="runoob" e218edb10161 runoob/ubuntu:v2
-m: 提交的描述信息
-a: 指定镜像作者
e218edb10161：容器 ID
runoob/ubuntu:v2: 指定要创建的目标镜像名
c.查看新镜像: docker images
d.使用新镜像启动容器: docker run -t -i runoob/ubuntu:v2 /bin/bash 
```

方式2:创建新镜像  
```
a.创建一个 Dockerfile 文件
docker build -t runoob/centos:6.7 .
-t ：指定要创建的目标镜像名
. ：Dockerfile 文件所在目录，可以指定Dockerfile 的绝对路径
b.docker images 查看创建的镜像
c.docker run -t -i runoob/centos:6.7  /bin/bash
```

- 运行镜像
```
docker run httpd
```


- 删除镜像
```
docker rmi hello-world
```

- 设置镜像标签
```
docker tag 860c279d2fec runoob/centos:dev  
docker tag 镜像ID，这里是 860c279d2fec ,用户名称、镜像源名(repository name)和新的标签名(tag)  
```


## docker 构建一个web应用程序

在docker构建Python Flask应用运行web应用
```
docker pull training/webapp  # 载入镜像

docker run -d -P training/webapp python app.py
-d:让容器在后台运行。
-P:将容器内部使用的网络端口映射到我们使用的主机上。

docker ps # 查看我们正在运行的容器

docker run -d -p 5000:5000 training/webapp python app.py #-p 参数来设置不一样的端口

浏览器访问：http://localhost:5000/
```

## docker compose的使用

- 创建测试目录
mkdir composetest  
cd composetest  

- 创建测试文件 composetest/app.py
touch app.py //创建文件  
vi app.py //写入文件  
cat app.py //查看文件  
```
import time

import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)


def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)


@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)
```

- 创建Dockerfile文件
```
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
CMD ["flask", "run"]

/**
FROM python:3.7-alpine: 从 Python 3.7 映像开始构建镜像。
WORKDIR /code: 将工作目录设置为 /code。
RUN apk add --no-cache gcc musl-dev linux-headers: 安装 gcc，以便诸如 MarkupSafe 和 SQLAlchemy 之类的 Python 包可以编译加速
COPY . .: 将 . 项目中的当前目录复制到 . 镜像中的工作目录。
CMD ["flask", "run"]: 容器提供默认的执行命令为：flask run。
*/
```

- 创建docker-compose.yml
```
# yaml 配置
version: '3'
services:
  web:
    build: .
    ports:
     - "5000:5000"
  redis:
    image: "redis:alpine"

/**
version 指定本 yml 依从的 compose 哪个版本制定的  
build 指定为构建镜像上下文路径  
volumes 将主机的数据卷或着文件挂载到容器里  
*/
```

- 使用compose命令构建和运行应用
docker-compose up  
docker-compose up -d




## java运行

- 执行jar包
java -jar xxx.jar。