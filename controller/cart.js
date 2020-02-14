const Router = require('koa-router'),
  mongoose = require('mongoose');
let router = new Router();

router.get('/getCartByUserId', async (ctx) => {
  const Cart = mongoose.model('Cart');
  await Cart.find({ userId: ctx.query.userId }).populate('productId').exec()
  .then((res) => {
    ctx.body = {
      code: 200,
      data: res,
    }
  })
  .catch((err) => {
    console.error(err);
    ctx.body = {
      code: 500,
      message: '获取购物车失败',
    }
  });
});

router.post('/addProductToCart', async (ctx) => {
  const Cart = mongoose.model('Cart'),
    cart = new Cart(ctx.request.body);
  await cart.save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: '添加成功',
      }
    })
    .catch(() => {
      ctx.body = {
        code: 500,
        message: '添加购物车失败',
      }
    });
});

router.post('/deleteProductInCartByProductId', async (ctx) => {
  const Cart = mongoose.model('Cart');
  await Cart.deleteOne({ productId: ctx.request.body.productId }).exec()
  .then((res) => {
    ctx.body = {
      code: 200,
      message: '删除成功',
    }
  })
  .catch((err) => {
    console.error(err);
    ctx.body = {
      code: 500,
      message: '删除失败',
    }
  });
});

module.exports = router;