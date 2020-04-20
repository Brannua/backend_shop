/**
 * @description 商品类型 数据模型
 * @author Brannua
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 定义数据模型
const typeSchema = new Schema({
  id: Schema.Types.ObjectId,
  typeId: Number,
  typeName: String,
})

// 发布数据模型
mongoose.model('Type', typeSchema)
