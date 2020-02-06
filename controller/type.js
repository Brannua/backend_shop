const Router = require('koa-router'),
  mongoose = require('mongoose'),
  path = require('path'),
  saveJsonDataToDB = require('../util/saveJsonDataToDB.js');
let router = new Router();

// 读取 /data/type.json 数据 , 然后保存到数据库
router.get('/readAndSaveTypeData', async (ctx) => {
  let filePath = path.resolve(__dirname, '../data/type.json');
  saveJsonDataToDB(filePath, mongoose.model('Type'));
  ctx.body = '数据开始导入数据库';
});

router.get('/getProductTypes', async (ctx) => {
  const Type = mongoose.model('Type');
  await Type.find({}).exec().then((res) => {
    ctx.body = {
      data: res,
      code: 200,
    }
  }).catch((err) => {
    ctx.body ={
      msg: err,
      code: 404,
    }
  });
});

module.exports = router;