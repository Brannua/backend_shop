# 移动端农机商城后端 ( 原生Koa2 )

> Author: 东北农业大学微机1705 -- 刘培杰

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

----------------------------------------

# 开发笔记小结

- 模块化规范遵循 : [commonJs](http://javascript.ruanyifeng.com/nodejs/module.html)

- es7 异步编程 async/await 解决 callbackHell , 执行 async 函数返回 Promise 对象

  ```js
  // demo
  function timeOut() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(1);
        resolve();
      }, 2000)
    })
  }

  async function fn() {
    await timeOut();
    console.log(2);
  }

  fn(); // 1 2
  ```

- [cookie](http://javascript.ruanyifeng.com/bom/cookie.html)

  - 项目虽并没有用到cookie, 但是前端向后端发送请求都会携带cookie

- 路由 [koa-router](https://github.com/ZijianHe/koa-router)

  - 配置路由前缀 prefix ( 用于多级导航规划 )

    - before : https://localhost:3000/login/

    - after : https://localhost:3000/prefix/login/

      ```js
        new Router({
          prefix: '/prefix'
        })
      ```

- get 请求，接收参数

  - ctx.query / ctx.queryString

    - query 返回的是格式化好的参数对象

    - queryString 返回的是字符串

- post请求，参数解析，使用插件 [koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser)

- post 请求，接收参数，事件监听，回调，数据流

  ```js
    // 用于接收数据
    let data = ''

    // 接收数据 ( chunk 为 Buffer 二进制 )
    ctx.req.on('data', (chunk) => {
      data += chunk
    })

    // 监听数据接收完毕
    ctx.req.on('end', () => {
      // 解码后 data 是 String 类型的数据 , 需要手动解析
      data = decodeURI(data)
    })
  ```

- [Mongoose数据建模 & 操作数据库](https://mongoosejs.com/)

  - 加载所有数据模型 使用插件 glob

- [图形化管理工具 Robo 3T](https://robomongo.org/)

- [MongoDB](https://www.mongodb.com)

  - [doc](https://docs.mongodb.com/manual/)

  - key-value 型数据库

  - 基于文档 , 存储所需空间大

  - 不支持事务操作

    - 事务指的是逻辑上的一组操作 , 组成这组操作的各个单元要么全都成功 , 要么全都失败

    - 事务作用 : 保证在一个事务中多次SQL操作要么全都成功 , 要么全都失败.

  - 在需要频繁读写数据库的场景下性能比关系型数据库更高

  - 而关系型数据库适用于含有较多表之间的级联查询的场景

- 前后端通信跨域使用插件 koa2-cors

  - ```credentials: true``` 是为了能够在后端代码中接受cookie , 否则由于cors的安全性原因后端无法接受cookie , 进而导致session失效 , 本项目并未使用cookie-session
  
- 密码加盐加密 使用插件 bcrypt

  - 本项目实现方式: 基于Promise处理异步

  - 其它实现方式 ( 使用mongoose的钩子函数 userSchema.pre('save', callback(next)) )

    ```js
      const bcrypt = require('bcrypt)

      userSchema.pre('save', function (next) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) return next(err)
          bcrypt.hash(this.passWord, salt, (err, hash) => {
            if (err) return next(err)
            this.passWord = hash
            next()
          })
        })
      })
    ```

- 商品分类功能 ( 数据库中维护两个集合 ) 类似外键

  - 商品类别集合 types 中的每一条数据维护两个字段

    - typeId

    - typeName

  - 商品信息集合 products 中的每一条数据除维护商品具体信息外 , 维护着 typeId 字段

- 多集合关联查询

  ```js
    // /model/Cart.js
    const cartSchema = new Schema({
      productId: {
        ref: 'Product' // 指向联合查询的model
      }
    })
    mongoose.model('Cart', cartSchema);

    // /controller/cart.js
    const Cart = mongoose.model('Cart');
    await Cart.find({ userId: ctx.query.userId }).populate('productId').exec()
  ```
