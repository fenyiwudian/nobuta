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
> 其实typescript是可以转高版本的语法的，需要把target设置成es5，同时把lib设置成高级版如es2018(如果不设置则编写代码时碰到高级语法会报错)，但是高级接口不会转化换，仍然需要polyfill.

+ 尝试增加babel-loader来将高级代码转成低级代码

### 配置
之前的项目中使用babel配置都很凌乱,由于没有深入了解babel的各个模块的作用,网上找了一些配置东拼西凑达到了效果,就继续做开发了.

这几天读了一下babel的文档,发现之前的很多配置,有些是重复配置的,有些是老版本的配置方式,有些配置是多余的,所以做了一些整理.

如下最基本配置这样就行了
+ targets自己按需以browserslist规则设置就行,这里我设置了ie10,则ie10上面原生不支持的高级功能都会被转化好.
+  `@babel/preset-env`不会管stage阶段的新功能,如果要使用则需要额外添加对应的preset,一般不需要
+ corejs选了最新的3版本,主要仓库中装的版本要和这个一致,否则会找不到对应的功能模块,构建报错,corejs版本2和版本3的目录结构是不一样的

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

## 总结

1. `typescript`中合理配置`tsconfig`（如将target设置成5,lib设置成最新的ecmascript版本）则能够将高级语法转成低级兼容语法，但是各种api功能（Array.prototype.includes,Object.assign等）仍然不会处理。
2. `typescript`根据其[设计理念和目标](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals#non-goals)来看，仅仅应把其当成一个类型检查工具，而不是代码处理工具（当然ts转es这一步处理是不可避免的，这是他的本职工作，但是额外的es兼容代码转换就不应该依赖它，虽然它仍然会更具target来转换es高级语法）。
3. 综上两点，还是需要使用到babel作为转换工具。

### 对于npm包的发布
以os-client-core为例，建议发两个版本的包，一个是做好了降成了es5的包，一个是未降成es5的包，这两个各有优缺点和适用场景。

降成es5的包：可以直接放心的使用，不过使用这自身也是使用es高级语法编程，会对自己的代码也使用降es5处理，这其中就会有两个地方都打入了babel的降es5兼容处理代码，造成部分重复代码导致总的bundle尺寸更大。

未降成es5的包：不可以直接使用，需要使用打包器重新降es5处理，不过通过[@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)可以使得依赖包和主项目共用es5降级注入代码，减少总bundle的尺寸大小。



