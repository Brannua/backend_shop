const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// 创建模型
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

// 发布模型
mongoose.model('User', userSchema);