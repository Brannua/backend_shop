const mongoose = require('mongoose'), // Node 和 MongoDB 数据通信的数据建模库
  db = 'mongodb://localhost:27017/shop'; // 所要链接的数据库

/* 链接数据库 */
function _connect(connectTime) {
  if (connectTime > 5) {
    console.log(`数据库链接失败 , 已尝试链接数据库 ${connectTime} 次 , 请检查后重试...`);
  } else {
    console.log(`第 ${connectTime} 次尝试链接数据库`);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}

module.exports = () => {

  let connectTime = 1; // 记录尝试链接数据库的链接次数
  _connect(connectTime);

  /* 监听数据库链接失败 */
  mongoose.connection.on('disconnected', () => {
    _connect(++connectTime);
  });
  /* 监听数据库出错 */
  mongoose.connection.on('error', (error) => {
    console.error(error) && _connect(++connectTime);
  });
  /* 监听数据库链接成功 */
  mongoose.connection.once('open', () => {
    console.log(`第 ${connectTime} 次链接数据库 , 链接成功!!!`);
  });

}