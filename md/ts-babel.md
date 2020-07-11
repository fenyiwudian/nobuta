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

### 配置
之前的项目中使用babel配置都很凌乱,由于没有深入了解babel的各个模块的作用,网上找了一些配置东拼西凑达到了效果,就继续做开发了.

这几天读了一下babel的文档,发现之前的很多配置,有些是重复配置的,有些是老版本的配置方式,有些配置是多余的,所以做了一些整理.

如下最基本配置这样就行了
+ targets自己按需以browserslist规则设置就行,这里我设置了ie10,则ie10上面原生不支持的高级功能都会被转化好.
+  `@babel/preset-env`不会管stage阶段的新功能,如果要使用则需要额外添加对应的preset,一般不需要
+ corejs选了最新的3版本,主要仓库中装的版本要这个一直,否则会找不到对应的功能模块,构建报错,corejs版本2和版本3的目录结构是不一样的

+ `useBuiltIns`配置成`usage`最省事,你用过的高级api在指定目标上没有支持的话,会被自动补充

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "ie": "10"
        },
        "useBuiltIns": "usage",
        "corejs": {
          "version": 3,
          "proposals": true
        }
      }
    ]
  ]
}

```



