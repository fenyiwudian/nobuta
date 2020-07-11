const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');
const fs = require('fs');

function getEntry(dir) {
  let result = {};
  const fileList = fs.readdirSync(dir);
  fileList.forEach(file => {
    const filePath = dir + '/' + file;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      result = { ...result, ...getEntry(filePath) };
    } else if (filePath.endsWith('.ts')) {
      const entryName = filePath.replace(/\.ts$/, '')
        .replace(/^\.src\//);
      result[entryName] = filePath;
    }
  });
  return result;
}

module.exports = () => {
  return {
    entry: {
      ...getEntry('./src/es'),
      ts: './src/ts/index.ts'
    },
    output: {
      filename: '[name].js',
      path: path.resolve('./dist')
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use:[
            {loader:'babel-loader'},
            {loader:'ts-loader'}
          ]
        }
      ]
    },
    optimization: {
      minimize: false
    },
    plugins: [
      new CleanWebpackPlugin()
    ],
    resolve: {
      extensions: [".ts", ".js"],
    },
  };
};