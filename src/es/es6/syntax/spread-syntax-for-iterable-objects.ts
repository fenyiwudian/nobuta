// 可迭代对象的展开语法
export default 1;
console.log('-----------spread syntax for iterable objects-------------');
// 调用方法时展开数组
function withArraysInFunctionCalls(..._args: number[]) {
  console.log(arguments);
}
console.log('with arrays in function calls');
withArraysInFunctionCalls(...[1, 2, 3, 4]);

// 数组字面值展开
function withArraysInArrayLiterals() {
  console.log(...[1, 2, 3]);
}
console.log('with arrays in array literals');
withArraysInArrayLiterals();