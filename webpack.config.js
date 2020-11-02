const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    devServer: {
      // stats: 'errors-only',
      contentBase: path.resolve(__dirname, 'dist'),
      headers: { "Access-Control-Allow-Origin": "*" },
      host: '0.0.0.0',
      port: 5678,
      // watchContentBase: true,
      hot: true,
    },
    entry: {
      ...getEntry('./src/lab'),
      combine: './src/babel-runtime/index.ts'
      // ts: './src/ts/index.ts',
      // lab: './src/lab/index.ts',
      // index: './src/index.ts'
    },
    output: {
      filename: '[name].js',
      path: path.resolve('./dist')
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            { loader: 'babel-loader' },
            { loader: 'ts-loader' }
          ]
        }
      ]
    },
    optimization: {
      minimize: false,
      // runtimeChunk: "single",
      // splitChunks: {
      //   // 将babel的附加辅助代码同一打包到一个地方，避免多个入口重复引入这些代码
      //   cacheGroups: {
      //     babel: {
      //       chunks: "all",
      //       name: "babel",
      //       test: /node_modules[\\/](@babel|core-js|regenerator-runtime[\\/]runtime)/,
      //       enforce: true,
      //     },
      //   }
      // }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new CleanWebpackPlugin()
    ],
    resolve: {
      extensions: [".ts", ".js"],
    },

  };
};