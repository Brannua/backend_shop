/**
 * @description 用户登录 密码校验
 * @author Brannua
 */

const bcrypt = require('bcrypt')

/**
 * 登录密码校验
 * @param {string} loginPwd 用户输入的密码
 * @param {string} dbPwd 数据库中的密码
 */
function comparePwd(loginPwd, dbPwd) {

  return new Promise((resolve, reject) => {

    bcrypt.compare(loginPwd, dbPwd, (err, isMatch) => {
      if (err) {
        reject(err)
        return
      }
      resolve(isMatch)
    })

  })
}

module.exports = comparePwd
