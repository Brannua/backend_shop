/* 用户登录密码和数据库密码相比对 , 用于用户登录功能 */

const bcrypt = require('bcrypt');

function comparePwd(loginPwd, dbPwd) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(loginPwd, dbPwd, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
}

module.exports = comparePwd;
