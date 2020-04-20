/**
 * @description 配置 常量
 * @author Brannua
 */

module.exports = {
  // 所要链接的数据库
  db: 'mongodb://localhost:27017/shop',
  // 初始化尝试链接数据库的最多次数
  maxConnectTime: 5,
  // 密码加盐的迭代次数
  iterationTime: 10,
  // 允许跨域访问的网址
  allowOriginSites: ['http://localhost:8080'],
  // 项目默认运行监听的端口
  serverPort: 3000
}
