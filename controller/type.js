/**
 * @description type controller
 * @author Brannua
 */

const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
const { getProductTypesFailInfo } = require('./_errorInfo')

// 查询商品分类
router.get('/getProductTypes', async (ctx) => {

  const Type = mongoose.model('Type')

  await Type.find({})
    .exec()
    .then((res) => {
    ctx.body = {
      data: res,
      code: 200,
    }
  }).catch((err) => {
    console.error(err)
    ctx.body = getProductTypesFailInfo
  })

})

module.exports = router
