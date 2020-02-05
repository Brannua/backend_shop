const Router = require('koa-router'),
  mongoose = require('mongoose'),
  path = require('path'),
  saveJsonDataToDB = require('../util/saveJsonDataToDB.js');
let router = new Router();

// 读取 /data/product.json 数据 , 然后保存到数据库
router.get('/readAndSaveProductData', async (ctx) => {
  let filePath = path.resolve(__dirname, '../data/product.json');
  saveJsonDataToDB(filePath, mongoose.model('Product'));
  ctx.body = '数据开始导入数据库';
});

module.exports = router;