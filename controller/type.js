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

module.exports = router;