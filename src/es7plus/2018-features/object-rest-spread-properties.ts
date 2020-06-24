// 对象属性展开和剩余属性分离
export default 1;
console.log('-------------object rest/spread properties------------');

function restProperties() {
  const origin = { a: 1, b: 2, c: '3' };
  const { a, ...othersObj } = origin;
  console.log(a, othersObj);
}
console.log('object rest properties');
restProperties();

function spreadProperties() {
  const origin = { b: 2, c: '3' };
  const combined = { a: 1, ...origin };
  console.log(combined);
}
console.log('object spread properties');
spreadProperties();

