const glob = require('glob'),
  path = require('path');

module.exports = () => {
  glob.sync(path.resolve(__dirname, '../model', '*.js')).forEach(require);
}
