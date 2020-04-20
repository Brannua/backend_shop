/**
 * @description 用户 数据模型
 * @author Brannua
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 定义数据模型
const userSchema = new Schema({
  userId: Schema.Types.ObjectId,
  userName: {
    unique: true,
    type: String
  },
  passWord: String,
  createTime: {
    type: Date,
    default: Date.now()
  },
})

// 发布数据模型
mongoose.model('User', userSchema)
