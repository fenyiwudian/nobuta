const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = () => {
  return {
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      headers: { "Access-Control-Allow-Origin": "*" },
      host: '0.0.0.0',
      port: 5678,
      hot: true,
    },
    entry: {
      index: './index.ts'
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
        template: 'index.html',
        filename: 'index.html',
      }),
      new CleanWebpackPlugin()
    ],
    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        "demo-module": path.join(__dirname, "lib/demo.js")
      }
    },
  };
};