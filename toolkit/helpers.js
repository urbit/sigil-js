const del = require('del')
const fs = require('fs')

removeContentSync = function(dirPath) {
  del.sync(dirPath)
  fs.mkdirSync(dirPath);
};

module.exports = {
  removeContentSync,
}
