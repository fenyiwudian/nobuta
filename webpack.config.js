const path = require('path');
module.exports = () => {
  return {
    entry: {
      index: './src/index.ts',
    },
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