const Router = require('koa-router');
let router = new Router();

// 加载控制器
let user = require('../controller/user.js');
let product = require('../controller/product.js');
let type = require('../controller/type.js');

// 配置路由和对应的控制器
router.use('/user', user.routes());
router.use('/product', product.routes());
router.use('/type', type.routes());

module.exports = router;
