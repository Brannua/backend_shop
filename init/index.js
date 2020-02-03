let connectMongoDB = require('./connectMongoDB'),
  loadModels = require('./loadModels');

module.exports = async () => {
  await connectMongoDB();
  loadModels();
}