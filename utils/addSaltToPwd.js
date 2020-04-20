/**
 * @description 密码加盐加密
 * @author Brannua
 */

const bcrypt = require('bcrypt')
const { iterationTime } = require('../config/constant')

function addSaltToPwd(password) {

  return new Promise((resolve, reject) => {

    // 随机生成salt，迭代次数 iterationTime，genSalt & hash 均为异步
    bcrypt.genSalt(iterationTime, (err, salt) => {

      if (err) {
        reject(err)
        return
      }

      // 加盐加密
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err)
          return
        }
        resolve(hash)
      })

    })
  })
}

module.exports = addSaltToPwd
