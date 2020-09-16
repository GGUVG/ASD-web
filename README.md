# project1

> test1st

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 要启动localhost:9092作为图片显示的假url,要开多一个terminal终端运行node server.js,小白操作看这
# ②安装Node.js中的Express框架
# 打开cmd，进入到服务器文件所在目录（示例目录是E:/xxx/xxx）,
# 运行命令npm install # express
# 等待安装完成。安装完成后该目录下会出现一个文件夹node_modules和一个文件package-lock.json
# 编写服务器文件（示例文件名为server.js）:
#   //加载express模块
#   var express = require('express');
#   var app = express();
#   app.use('/welfare', express.static('welfare'));
#   var server = app.listen(9092);
# 终端运行 node server.js
# 注意：需要将相应的文件放在指定文件夹中，以我的文件为例，服务器文件server.js在E:/xxx/xxx下，
# 该文件夹中包含welfare文件夹，用于存放需要访问的文件。在Chrome通过链接http://127.0.0.1:port/welfare/文件名
# 访问文件，其中的port为app.listen()中的参数（我这里是9092）
