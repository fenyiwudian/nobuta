// 展示直接字符串搜索和正则搜索的区别
// 最终都是转成正则搜索,但转正则的过程中有差异

var special = /([\\(){}*+.[\]?^|])/g;

var normaToReg = function (key) {
  return key.replace(special, '\\$1');
};

var text = '111\\222\\333\\d\\w\\t\\s---dwts{}[](123)(\\d+)';


// // 用'\'来普通搜索,能搜到
// var key = '\\';
// // 普通搜索变成正则搜索的时候需要转义一下特殊字符
// var regKey = normaToReg(key);
// console.log(regKey);
// console.log(text.match(new RegExp(regKey, 'g')));

// // 用'\'来正则搜索,应报错:不正确的正则表达式
// // 正则搜索时不转义特殊字符
// try{
//     console.log(key);
//     console.log(text.match(new RegExp(key, 'g')));
// }catch(e){
//     console.log('无效正则');
// }

// 用'(\d+)'来普通搜索, 搜索到(\d+)
var key = '(\\d+)';
var regKey = normaToReg(key);
console.log(regKey);
console.log(text.match(new RegExp(regKey, 'g')));

// 用'(\d+)'来正则搜索, 搜索到123
console.log(key);
console.log(text.match(new RegExp(key, 'g')));


// 所以说做搜索的时候无论是普通模式搜索和正模式搜索
// 方便的方法是都统一转为正则搜索
// 不同的地方是普通搜索转成正则搜索时,先对关键字中的特殊字符转义一下
// 正则搜索的时候直接用关键字当正则进行搜索,如果关键字不是合法的正则,则报错.