var babel = require('babel-core');

module.exports = {
  process: function (src, filename) {
    if (babel.util.canCompile(filename)) {
      return babel.transform(src, {
        filename,
        presets: [
          require('babel-preset-web-app'),
          require('babel-preset-react')
        ],
        retainLines: true,
      }).code;
    }
    return src;
  }
};
