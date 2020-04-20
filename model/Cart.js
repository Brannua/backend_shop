/**
 * @description 购物车 数据模型
 * @author Brannua
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
let objectId = Schema.Types.ObjectId

// 定义数据模型
const cartSchema = new Schema({
  id: objectId,
  userId: objectId,
  productId: {
    type: objectId,
    ref: 'Product'
  },
  createDate: {
    type: Date,
    default: Date.now()
  },
})

// 发布数据模型
mongoose.model('Cart', cartSchema)
