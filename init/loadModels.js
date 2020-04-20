/**
 * @description 加载所有数据模型
 * @author Brannua
 */

const glob = require('glob')
const path = require('path')

module.exports = () => {

  const allModelFiles = path.resolve(__dirname, '..', 'model', '*.js')

  glob.sync(allModelFiles).forEach(require)

}
