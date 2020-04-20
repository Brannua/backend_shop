/**
 * @description 购物车 controller
 * @author Brannua
 */

const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')
const { getCartFailInfo, addCartFailInfo, delCartFailInfo } = require('./_errorInfo')

// 获取用户购物车数据
router.get('/getCartByUserId', async (ctx) => {

  const Cart = mongoose.model('Cart')
  const { userId } = ctx.query

  await Cart.find({ userId })
    .populate('productId')
    .exec()
    .then((res) => {
      ctx.body = {
        code: 200,
        data: res,
      }
    })
    .catch((err) => {
      console.error(err)
      ctx.body = getCartFailInfo
    })

})

// 商品添加购物车
router.post('/addProductToCart', async (ctx) => {

  const Cart = mongoose.model('Cart')
  const cart = new Cart(ctx.request.body)

  await cart.save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: '添加成功'
      }
    })
    .catch(() => {
      ctx.body = addCartFailInfo
    })

})

// 删除购物车中的商品
router.post('/deleteProductInCartByProductId', async (ctx) => {

  const Cart = mongoose.model('Cart')
  const { productId } = ctx.request.body

  await Cart.deleteOne({ productId })
    .exec()
    .then((res) => {
      ctx.body = {
        code: 200,
        message: '删除商品成功'
      }
    })
    .catch((err) => {
      console.error(err)
      ctx.body = delCartFailInfo
    })

})

module.exports = router
