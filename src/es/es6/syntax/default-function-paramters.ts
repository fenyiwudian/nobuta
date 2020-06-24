// 函数默认参数
export default 1;
console.log('---------default function paramters-----------');
// 基本功能
function basic(a = 'default a', b = 'default b') {
  console.log(a, b);
}
console.log('basic functionality without passing any parameters')
basic();
console.log('basic functionality passing first parameters')
basic('custom a');

// 显式传递undefined遵从默认值
console.log('explicit undefined defers to the default');
basic(undefined, 'custom b');

// 默认值可以引用之前的参数
function referPrevParam(a: string, b = a) {
  console.log(a, b);
}
console.log('defaults can refer to previous params');
referPrevParam('param a');

// arguments 对象的交互
function argumentsInteraction(a = 'default a', b = 'default b', c = 'default c') {
  a = 'changed a';
  console.log(arguments.length, arguments[0], arguments[1], arguments[2]);
  console.log(a, b, c);
}
console.log('the argements object is not mapped to parameters but arguments');
argumentsInteraction('custom a', 'custom b');


// 临时死区
function temporalDeadZone() {
  try {
    eval("(function(a=a){}())");
  } catch (e) {
    console.log(e);
  }
  try {
    eval("(function(a=b,b){}())");
  } catch (e) {
    console.log(e)
  }
}
console.log('temporal dead zone caused by default parameters');
temporalDeadZone();

// 隔离的作用域
function separateScope(fn = function () {
  // @ts-ignore
  console.log(b);
}) {
  // @ts-ignore
  const b = 1;
  fn();
}
console.log('seperate scope of default parameter function and main function');
separateScope();

// 默认参数支持newFunction

function newFunctionSupport() {
  const fn = new Function('a = "default a"', 'b = "default b"', "console.log(a,b)");
  fn();
}
console.log('new function support');
newFunctionSupport();