


/**
 * 加载器日志
 */
module.exports = function (source) {
  const file = this.resourcePath;
  console.log(file);
  return source;
};