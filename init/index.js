/**
 * @description 链接数据库 加载数据模型 入口文件
 * @author Brannua
 */

let connectMongoDB = require('./connectMongoDB'),
  loadModels = require('./loadModels')

module.exports = async () => {
  await connectMongoDB()
  loadModels()
}
