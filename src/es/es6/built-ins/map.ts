// Map类型的使用
export default 1;
console.log('------------map------------------')
// 基本功能
function basic() {
  const key = {};
  const map = new Map();
  map.set(key, 123);
  console.log(map.has(key), map.get(key));
}
console.log('basic funnctionality');
basic();