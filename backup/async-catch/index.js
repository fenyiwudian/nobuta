function getData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve('data');
      } else {
        reject('invalid id:' + id);
      }
    }, 500);
  });
}


function promiseCatch(id) {
  getData(id).then(data => {
    console.log('promise catch get data success:' + data);
  }).catch(error => {
    console.error('promise catch get data failed:' + error);
  }).finally(() => {
    console.log('promise finally always be executed');
  });
}

function promiseChainErr() {
  getData(12).then(data => {
    console.log('promise chain get data success:' + data);
    console.log('but i throw a  promise chain error here');
    throw 'promise chain err';
  }).catch(error => {
    console.error('promise chain error catched by me:' + error);
  });
}

async function asyncCatch(id) {
  try {
    const data = await getData(id);
    console.log('async catch get data success:' + data);
  } catch (error) {
    console.error('async catch get data failed:' + error);
  }
  console.log('async catch finally are normal codes after try/catch so obviously always be executed');
}

async function asyncChainError() {
  try {
    const data = await getData(34);
    console.log('async catch get data success:' + data);
    console.log('but i throw a normal chain error here');
    throw 'normal chain error';
  } catch (error) {
    console.error('async normal chain error catched by me obviously:' + error);
  }
}



function syncAdd(a, b) {
  return a + b;
}

async function asyncAdd(a, b) {
  return a + b;
}


async function main() {
  promiseCatch(1);
  promiseCatch(-1);
  asyncCatch(1);
  asyncCatch(-1);
  promiseChainErr();
  asyncChainError();
  const times = 100000;
  const syncStart = Date.now();
  let syncResult = 0;
  for (let i = 0; i < times; i++) {
    const syncPart = syncAdd(i, i + 1);
    syncResult += syncPart;
  }
  console.log(`sync tasks with times: ${times} result:${syncResult} cost time:${Date.now() - syncStart}`);

  const asyncStart = Date.now();
  let asyncResult = 0;
  for (let i = 0; i < times; i++) {
    const asyncPart = await asyncAdd(i, i + 1);
    asyncResult += asyncPart;
  }
  console.log(`async tasks with times: ${times} result:${asyncResult} cost time:${Date.now() - asyncStart}`);
}

main();

