// 因为我们要使用babel处理node_modules下面的核心包
// 所欲需要使用babel.config.xxx风格的配置文件
module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "loose": true,
        "corejs": {
          "version": 3,
          "proposals": true
        },
        "targets": {
          "ie": "10"
        }
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "version": "7.12.1"
      }
    ]
  ]
};