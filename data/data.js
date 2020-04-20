/**
 * @description 仅用于测试开发阶段 nodejs读取本目录下的json文件导入mongodb
 * @author Brannua
 */

const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
const path = require('path')
const _saveJsonDataToDB = require('../utils/_saveJsonDataToDB')

// product.json
router.get('/readAndSaveProductData', async (ctx) => {
  const filePath = path.resolve(__dirname, 'product.json')
  _saveJsonDataToDB(filePath, mongoose.model('Product'))
  ctx.body = '数据开始导入数据库'
})

// type.json
router.get('/readAndSaveTypeData', async (ctx) => {
  let filePath = path.resolve(__dirname, 'type.json')
  _saveJsonDataToDB(filePath, mongoose.model('Type'))
  ctx.body = '数据开始导入数据库'
})

module.exports = router
