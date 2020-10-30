export default function () {
  return ''.startsWith('aaaaa');
}
var a = '1';
var foo = {
  // changed
  const: function () { },
  var: function () { },

  // not changed
  "default": 1,
  [a]: 2,
  foo: 1
};
console.log(foo);

class A {

}
console.log(A, ...[1, 2, 3], { ...{ a: 1, b: 2 } });

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }