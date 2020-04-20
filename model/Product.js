/**
 * @description 农机商品 数据模型
 * @author Brannua
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 定义数据模型
const productSchema = new Schema({
  id: Schema.Types.ObjectId,
  typeId: Number,
  name: String,
  img: String,
  price: Number,
  company: String,
  city: String,
})

// 发布数据模型
mongoose.model('Product', productSchema)
