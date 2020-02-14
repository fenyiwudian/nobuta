const input = document.querySelector('input');

input.onchange = () => {
  const file = input.files[0];

  window.JSZip.loadAsync(file).then((zip) => {
    zip.forEach((path, item) => {
      if (item.name === 'word/document.xml') {
        item.async('text').then(rs => {
          console.log(rs);
        });
      }
    });
  });
};

const wait = (number) => {
  if (number === 0) {
    return Promise.resolve();
  }
  if (number < 0) {
    return Promise.reject();
  }
  // return Promise.resolve();
  return new Promise(resolve => {
    // resolve();
    // if (number < 0) {
    //     throw 'error time';
    // }
    setTimeout(resolve, 2000);
  });
};

document.querySelector('button').onclick = async function () {
  const start = Date.now();
  console.log('start');
  await wait();
  console.log('end, cost: ', Date.now() - start);
};


const normalFn = () => {
  console.log('start normal');

  wait().then(() => {
    console.log('end normal');
  });
  return 'normal';
};

const asyncFn = async () => {
  console.log('start async');
  await wait();
  console.log('end async');
  return 'async';
};

const testNormalVsAsync = async () => {
  const n = normalFn();
  console.log('normal value:', n);

  const v = await asyncFn();
  console.log('async value:', v);
};

testNormalVsAsync();


const testDotCatchAndTryCatch = async (number) => {
  console.log();
  try {
    await wait(number);
    console.log('success with time', number);
  }
  catch (err) {
    console.log('got error with:', err, number);
    throw err;
  } finally {
    console.log('finally');
  }
};

testDotCatchAndTryCatch(100);


/**
 * 1. promise式的方法中非Promise中出现的错误不会被.catch()到
 * 而async式的无论是Promise内或外的都能被try catch到。
 *
 * 2. async方法调用是加了await后完全变成了同步编程的方式，思维需要被转换，
 * 前面的代码一定会等async方法里面的层层promise完成才继续执行后面的代码。
 * 调用某个async方法不加await则仍然会马上执行后面的方法。
 * 3. 所有不要想着所有promise式都转成async式，各有各的用途和方便。
 *
 *
 */




// const syncTest = () => {
//     wait().then(() => {
//     });
//     asyncTest();
//     console.log(1111);
//     return 111;
// };

// const asyncTest = async () => {
//     await wait();
//     console.log(222);
//     return 222;
// };

// wait().then(() => {
// });
// asyncTest();
// console.log(1111);


