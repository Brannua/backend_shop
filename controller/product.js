/**
 * @description product controller
 * @author Brannua
 */

const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
const { getProductOnThisTypeFailInfo, getProductDetailFailInfo } = require('./_errorInfo')

// 查询某一类商品
router.get('/getProductsByType', async (ctx) => {

  const { typeId, start, count } = ctx.query
  const Product = mongoose.model('Product')

  await Product.find({ typeId })
    .skip(parseInt(start))
    .limit(parseInt(count))
    .exec()
    .then((res) => {
      ctx.body = {
        code: 200,
        data: res
      }
    })
    .catch((err) => {
      console.error(err)
      ctx.body = getProductOnThisTypeFailInfo
    })

})

// 获取商品详情信息
router.get('/getProductDetailById', async (ctx) => {

  const Product = mongoose.model('Product')
  const { id } = ctx.query

  await Product.findOne({ _id: id })
    .exec()
    .then((res) => {
      ctx.body = {
        code: 200,
        data: res
      }
    })
    .catch((err) => {
      console.error(err)
      ctx.body = getProductDetailFailInfo
    })

})

module.exports = router