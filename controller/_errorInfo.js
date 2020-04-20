/**
 * @description 返回的错误信息
 * @author Brannua
 */

module.exports = {
  // 密码错误
  loginPasswordWrongInfo: {
    code: 401,
    message: '密码错误'
  },
  // 查询某一类商品失败
  getProductOnThisTypeFailInfo: {
    code: 404,
    msg: '查询此类商品失败'
  },
  // 查询商品详情信息失败
  getProductDetailFailInfo: {
    code: 404,
    msg: '查询商品详情信息失败'
  },
  // 获取商品分类失败
  getProductTypesFailInfo: {
    msg: '获取商品分类信息失败',
    code: 404
  },
  // 用户名不存在
  userNotExistInfo: {
    code: 404,
    message: '用户名不存在'
  },
  // 添加购物车失败
  addCartFailInfo: {
    code: 500,
    message: '添加购物车失败'
  },
  // 获取购物车失败
  getCartFailInfo: {
    code: 500,
    message: '获取购物车失败'
  },
  // 删除购物车中的商品失败
  delCartFailInfo: {
    code: 500,
    message: '删除购物车中的商品失败'
  },
  // 用户注册失败
  registFailInfo: {
    code: 500,
    message: '用户注册失败'
  }
}