/**
 * @description 路由入口文件
 * @author Brannua
 */

const Router = require('koa-router')
let router = new Router()

// 分模块导入路由
let user = require('../controller/user')
let product = require('../controller/product')
let type = require('../controller/type')
let cart = require('../controller/cart')

// 定义路由前缀，加载路由
router.use('/user', user.routes())
router.use('/product', product.routes())
router.use('/type', type.routes())
router.use('/cart', cart.routes())

// 测试数据
let testData = require('../data/data')
router.use('/test', testData.routes())

module.exports = router
