
const fs = require('fs');

/* 
  filePath: 读取的文件
  Model: mongoose.model 数据模型
*/
module.exports = (filePath, Model) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let count = 0; // 统计插入数据库成功的数据条数
      data = JSON.parse(data);
      data.map((value, index) => {
        let item = new Model(value);
        item.save().then(() => {
          console.log(`success: ${++count}`);
        }).catch((err) => {
          console.log(`fail: ${err}`);
        });
      });
    }
  });
}