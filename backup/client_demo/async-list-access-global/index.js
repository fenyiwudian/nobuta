const list = ['a', 'b', 'c', 'd', 'e'];


const global = {
  current: '',
};

async function task(item) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`execute:${item}, current item:${global.current}`);
      resolve();
    }, 100);
  });
}

async function asyncList() {
  console.log('------------start async tasks-----------');
  for (const item of list) {
    global.current = item;
    console.log(`register global:${item}`);
    await task(item);
  }
  console.log('------------all async tasks done--------');
}

function promiseListChainLost() {
  console.log('-----------start promise chain lost tasks--------------');
  const tasks = list.map(item => {
    return Promise.resolve().then(() => {
      global.current = item;
      console.log(`register global:${item}`);
      return task(item);
    });
  });

  return Promise.all(tasks).then(() => {
    console.log('------------all promise chian lost tasks done-------------');
  });
}

function promiseListChainLostAgain() {
  console.log('---------------start promise chain lost again tasks---------------');
  const promises = list.map(item => {
    // 一旦生成promise，则这些promise就在当前任务完整后的微任务调用中被执行
    // 所以我们这种方式仍然不能保证顺序
    return Promise.resolve().then(() => {
      global.current = item;
      console.log(`register global:${item}`);
      return task(item);
    });
  });

  return new Promise(resolve => {
    const work = (promise) => {
      if (promise) {
        promise.then(() => {
          work(promises.shift());
        });
      } else {
        resolve();
      }
    };
    work(promises.shift());
  }).then(() => {
    console.log('----------------all promise chain lost again tasks done--------------');
  });
}

function promiseListChainKeep() {
  console.log('---------------start promise chain keep tasks---------------');
  const myList = [...list];
  return new Promise(resolve => {
    const work = (item) => {
      if (item) {
        global.current = item;
        console.log(`register global:${item}`);
        task(item).then(() => {
          work(myList.shift());
        });
      } else {
        resolve();
      }
    };
    work(myList.shift());
  }).then(() => {
    console.log('----------------all promise chain keep tasks done--------------');
  });
}


async function main() {
  await asyncList();
  await promiseListChainLost();
  await promiseListChainLostAgain();
  await promiseListChainKeep();
}

main();