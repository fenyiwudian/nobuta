### 如何合理的使用babel转换代码


+ 在ts中写上高级语法如数组展开(spread syntax for iterable object)和对象展开(object spread)
+ 在ts中写上高级接口,如Array.prototype.includes方法
+ 配置好基本的webpack配置,构建ts文件,禁用webpack的minimize功能方便观察构建后的结果
```javascript
    optimization: {
      minimize: false
    }
```
+ 构建后可以发现typescript直接构建后只会把ts代码转成等同的js代码,在低级的浏览器上是无法运行的.

+ 尝试增加babel-loader来将高级代码转成低级代码

+