// 输出的includes方法
export default 1;
console.log('------------Array.prototyp.includes---------');

// 基本功能
function basic() {
  console.log([1, 2, 3].includes(1));
  console.log(![1, 2, 3].includes(4));
  console.log(![1, 2, 3].includes(1, 1));
  console.log([NaN].includes(NaN));
  // @ts-ignore
  console.log(Array(1).includes());
}
console.log('basic funcionality');
basic();