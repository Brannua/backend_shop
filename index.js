const Koa = require('koa'),
  App = new Koa(),
  Init = require('./init/index.js'),
  Router = require('./router/router.js'),
  cors = require('koa2-cors'),
  bodyParser = require('koa-bodyparser');

// 链接数据库并加载数据模型
Init();

// 解决跨域 ( 应在配置路由之前!!! )
App.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true
}));

// 解析post请求 ( 应在配置路由之前!!! )
App.use(bodyParser());

// 配置路由
App.use(Router.routes());
App.use(Router.allowedMethods());

// 开启后端服务并监听端口
App.listen(3000, () => {
  console.log(`Running on port 3000`);
});