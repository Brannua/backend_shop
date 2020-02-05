const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// 创建模型
const typeSchema = new Schema({
  id: Schema.Types.ObjectId,
  typeId: Number,
  typeName: String,
});

// 发布模型
mongoose.model('Type', typeSchema);
