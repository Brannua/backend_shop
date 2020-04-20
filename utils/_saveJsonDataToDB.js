/**
 * @description nodejs读取json文件数据存入数据库
 * @author Brannua
 */

const fs = require('fs')
const mongoose = require('mongoose')

/**
 * nodejs读取json文件数据存入数据库
 * @param {string} filePath 读取的文件
 * @param {Object} Model 数据模型
 */
function readJsonFileThenSaveToDB(filePath, Model) {

  fs.readFile(filePath, 'utf8', (err, data) => {

    if (err) {
      console.error(err)
      return
    }

    data = JSON.parse(data)

    // 计数器
    let successCount = 0
    let failCount = 0

    data.map((value, index) => {

      let item = new Model(value)

      // 随机给商品分商品类型id，仅用于测试
      if (mongoose.model('Product') === Model) {
        item.typeId = Math.ceil(Math.random() * 8)
      }

      item.save()
        .then(() => {
          console.log(
            `success: ${++ successCount}`
          )
        })
        .catch((err) => {
          console.log(
            `fail: ${++ failCount}`
          )
        })

    })
  })
}

module.exports = readJsonFileThenSaveToDB
