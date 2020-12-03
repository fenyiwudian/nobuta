
function calculate() {
  const a = Math.random();
  const b = Math.random();
  const c = a + b;
  const d = !!c && new Boolean(Math.round(Math.random()));
  return d;
}

function reuseFn() {
  calculate();
}

function newFn() {
  const localFn = () => {
    const a = Math.random();
    const b = Math.random();
    const c = a + b;
    const d = !!c && new Boolean(Math.round(Math.random()));
    return d;
  };
  localFn();
}





function main() {
  const times = 100000;
  const resueStart = Date.now();
  for (let i = 0; i < times; i++) {
    reuseFn();
  }
  console.log(`reuseFn times${times} cost: ${Date.now() - resueStart}`);
  const newStart = Date.now();
  for (let j = 0; j < times; j++) {
    newFn();
  }
  console.log(`newFn times${times} cost: ${Date.now() - newStart}`);
}

main();