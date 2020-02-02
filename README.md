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