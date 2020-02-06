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

router.get('/getProductsByType', async (ctx) => {
  let { typeId, start, count } = ctx.query;
  const Product = mongoose.model('Product');
  await Product.find({typeId}).skip(parseInt(start)).limit(parseInt(count)).exec()
    .then((res) => {
      ctx.body = {
        code: 200,
        data: res,
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 404,
        msg: err,
      }
    });
});

module.exports = router;