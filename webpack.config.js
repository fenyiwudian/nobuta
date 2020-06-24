const path = require('path');
const fs = require('fs');

function getEntry(dir) {
  let result = {};
  const fileList = fs.readdirSync(dir);
  fileList.forEach(file => {
    const filePath = dir + '/' + file;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      result = { ...getEntry(filePath) };
    } else if (filePath.endsWith('.ts')) {
      result[filePath.replace(/\.ts$/)] = filePath;
    }
  });
  return result;
}


module.exports = () => {
  return {
    entry: getEntry(),
    output: {
      filename: '[name].js',
      path: path.resolve('./dist')
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
        }
      ]
    },
    optimization: {
      minimize: false
    }
  };
};