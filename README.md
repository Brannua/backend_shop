# 移动端农机商城后端 ( 原生Koa2 )

> [项目文档和开发笔记总结请移步此处](https://blog.csdn.net/Brannua/article/details/105678906)

### 本项目技术栈

```koa2、node.js、es6、mongodb、mongoose```

### 快速启动项目

- 确保 Node.js 版本不低于 8

- 确保开启 mongodb 数据库，监听默认端口 27017

```
  npm install   // 安装项目依赖

  npm run dev   // 运行项目，默认监听端口 3000
```

### 项目结构

```
  .
  ├── config                    // 项目配置
  │   └── constant.js
  ├── controller                // 控制器
  │   ├── cart.js
  │   ├── _errorInfo.js
  │   ├── product.js
  │   ├── type.js
  │   └── user.js
  ├── data                      // 假数据
  │   ├── data.js
  │   ├── product.json
  │   └── type.json
  ├── index.js                  // 项目入口文件
  ├── init                      // 连数据库 加载数据模型
  │   ├── connectMongoDB.js
  │   ├── index.js
  │   └── loadModels.js
  ├── model                     // 数据模型
  │   ├── Cart.js
  │   ├── Product.js
  │   ├── Type.js
  │   └── User.js
  ├── package.json              // 项目配置
  ├── README.md                 // 快速上手说明书
  ├── router                    // 路由
  │   └── router.js
  └── utils                     // 工具方法
      ├── addSaltToPwd.js
      ├── comparePwd.js
      └── _saveJsonDataToDB.js
```

> Author: 东北农业大学微机1705 -- 刘培杰
