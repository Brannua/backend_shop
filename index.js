/**
 * @description 项目入口文件
 * @author Brannua
 */

const Koa = require('koa')
const App = new Koa()
const Init = require('./init/index.js')
const Router = require('./router/router.js')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const { allowOriginSites, serverPort } = require('./config/constant')

// 链接数据库后加载数据模型
Init()

// 配置路由之前cors处理跨域
App.use(cors({
  origin: allowOriginSites,
  credentials: true
}))

// 配置路由之前解析post请求
App.use(bodyParser())

// 配置路由
App.use(Router.routes())
App.use(Router.allowedMethods())

// 开启后端服务并监听端口
App.listen(serverPort, () => {
  console.log(
    `Running on port ${serverPort}`
  )
})
