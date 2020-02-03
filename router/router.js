const Router = require('koa-router');
let router = new Router();

// 加载控制器
let user = require('../controller/user.js');

// 配置路由和对应的控制器
router.use('/user', user.routes());

module.exports = router
