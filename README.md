# 移动端农机商城后端 ( Koa )

- 开发环境

  - Node.js ( v10.15.3 ) --> [Node.js-doc](https://nodejs.org/zh-cn/)

  - 模块化规范遵循 [commonJs](http://javascript.ruanyifeng.com/nodejs/module.html)

  - Koa --> [Koa-doc](https://koa.bootcss.com/)

    ```
    npm init // 生成 package.json

    npm install koa --save // 安装 koa
    ```

- 异步编程 async/await 解决 callbackHell , 执行 async 函数返回 Promise 对象

  ```
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

- 当前端发送 get 请求时 , 后端接收参数的方式

  - ctx.query / ctx.queryString 的区别

    - query 返回的是格式化好的参数对象

    - queryString 返回的是字符串

- 当前端发送 post 请求时 , 后端接收参数的方式

  ```
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

- koa-bodyparser 中间件 **自动解析** 前端 post 请求发送到后端的参数

  - [doc](https://www.npmjs.com/package/koa-bodyparser)

  - 安装

    ```
    npm install koa-bodyparser --save
    ```

- koa-router

  - [doc](https://github.com/ZijianHe/koa-router)

  - 安装

    ```
    npm install koa-router --save
    ```

  - 配置路由前缀 prefix ( 用于多级导航规划 )

    - before : https://localhost:3000/login/

    - after : https://localhost:3000/prefix/login/

      ```
      new Router({
        prefix: '/prefix'
      })
      ```

- cookie

  - [doc](http://javascript.ruanyifeng.com/bom/cookie.html)

  - 手动封装管理 cookie 的 API
  
    ```
    let cookieManager = {

      // 设置 cookie
      setCookie(name, value, time) {
        document.cookie = name + '=' + value + ';max-age=' + time
        return this // 实现链式调用
      },

      // 删除 cookie
      removeCookie(name) {
        this.setCookie(name, '', -1)
      },

      // 查询 cookie
      getCookie(name, callback) {

        let allCookieArr = document.cookie.split('; ')

        for (var i = 0; i < allCookieArr.length; i ++) {
          let itemCookieArr = allCookieArr[i].split('=')
          if (itemCookieArr[0] == name) {
            callback(itemCookieArr[1])
            return this // 实现链式调用
          }
        }

        //如果for循环结束没找到所要查找的cookie就给回调函数传undefined
        callback( undefined )
        return this
      }
    }
    ```

- MongoDB

  - key-value 型数据库

  - 基于文档 , 存储所需空间大

  - 在需要频繁读写数据库的场景下性能比关系型数据库更高

  - 不支持事务操作
    - 事务指的是逻辑上的一组操作 , 组成这组操作的各个单元要么全都成功 , 要么全都失败
    - 事务作用 : 保证在一个事务中多次SQL操作要么全都成功 , 要么全都失败.
  
  - 而关系型数据库适用于含有较多表之间的级联查询的场景

  - [官网](https://www.mongodb.com)

  - [doc](https://docs.mongodb.com/manual/)

  - 图形化管理工具 Robo 3T : [官网](https://robomongo.org/)

  - mongoose : Node 和 MongoDB 数据通信的数据建模库

    ```
    npm install mongoose --save    
    ```

  - mongoose.Schema 定义数据模型
  
  - 加载所有数据模型

    ```
    npm install glob --save
    ```

- 前后端通信的跨域解决方案 koa2-cors 中间件

  ```
  const cors = require('koa2-cors');
  app.use(cors({
    origin: [
      'http://localhost:8080'
    ],
    credentials: true
  }));
  ```
  
- 密码加盐加密 bcrypt

  ```
  npm install bcrypt@3.0.6 --save
  ```

  - 实现方式一 ( 模块化处理 + Promise处理异步 )

    ```
    // handle in /bcrypt/bcrypt.js

    // use in /controller/user.js
    const addSaltToPwd = require('../bcrypt/bcrypt.js');
    
    const User = mongoose.model('User');
    let newUser = new User(ctx.request.body);
    newUser.passWord = await addSaltToPwd(newUser.passWord);
    ```

  - 实现方式二 ( 使用钩子函数 userSchema.pre('save', callback(next)) )

    ```
    // use in /model/User.js
    const bcrypt = require('bcrypt);
    
    userSchema.pre('save', function (next) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.passWord, salt, (err, hash) => {
          if (err) return next(err);
          this.passWord = hash;
          next();
        });
      });
    });
    ```

  - 用户登录功能中解耦密码比较模块

    - before

      ```
      // In /model/User.js
      userSchema.methods = {
        comparePwd: (loginPwd, dbPwd) => {...}
      }
      ```

    - after

      ```
      // In /bcrypt/comparePwd.js

      // Use in /controller/user.js 用户登录逻辑
      ```

- 商品分类功能 ( 数据库中维护两个集合 )

  - 商品类别集合 types 中的每一条数据维护两个字段

    - typeId

    - typeName

  - 商品信息集合 products 中的每一条数据除维护商品具体信息外 , 维护着和 types 中对应的 typeId 字段

- Tips

  - 作为一个学习和练手的项目 , 该项目并没有设计用户上传商品数据的功能 , 故采用 Node.js 读取 /data/*.json 文件 , 并将数据保存到 MongoDB 数据库中

    - 读取文件并插入数据库功能单独封装到 /util/saveJsonDataToDB.js

    - 数据模型定义

    - 路由配置

    - 定义 controller 调用 saveJsonDataToDB.js

    - 浏览器输入配置的路由回车即可执行对应 controller 中数据存入数据库的操作

  - 由于 /data/product.json 中每条商品数据都没有对应的商品分类 ID , 故使用 /data/type.json 文件给商品随机分配类型

    ```
    // In /controller/product.js
    product.type = Math.ceil(Math.random() * 8);
    ```

- 多集合关联查询

  ```
  // /model/Cart.js
  const cartSchema = new Schema({
    productId: {
      ref: 'Product' // 指向联合查询的model
    }
  });
  mongoose.model('Cart', cartSchema);

  // /controller/cart.js
  const Cart = mongoose.model('Cart');
  await Cart.find({ userId: ctx.query.userId }).populate('productId').exec()
  ```