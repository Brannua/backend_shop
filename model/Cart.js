const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
let objectId = Schema.Types.ObjectId;

// 创建模型
const cartSchema = new Schema({
  id: objectId,
  userId: objectId,
  productId: {
    type: objectId,
    ref: 'Product'
  },
  createDate: {type: Date, default: Date.now()},
});

// 发布模型
mongoose.model('Cart', cartSchema);
