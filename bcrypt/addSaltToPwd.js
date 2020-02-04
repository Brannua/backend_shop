/* 加盐加密 */
const bcrypt = require('bcrypt');

function addSaltToPwd(password) {
  return new Promise((resolve, reject) => {
    // 随机生成 salt , 并迭代 10 次 ( 注意 genSalt 和 hash 方法都是异步的 , 无法使用 await )
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        // 给密码加盐
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            // 加盐加密成功
            resolve(hash);
          }
        });
      }
    });
  });
}

module.exports = addSaltToPwd;
