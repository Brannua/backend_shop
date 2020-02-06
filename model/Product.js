const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// 创建模型
const productSchema = new Schema({
  id: Schema.Types.ObjectId,
  typeId: Number,
  name: String,
  img: String,
  price: Number,
  company: String,
  city: String,
});

// 发布模型
mongoose.model('Product', productSchema);
