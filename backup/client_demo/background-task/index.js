if (!window.requestIdleCallback) {
  console.log('use shim');
  window.requestIdleCallback = function (handler) {
    let startTime = Date.now();

    return setTimeout(function () {
      handler({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50.0 - (Date.now() - startTime));
        }
      });
    }, 1);
  };
}
let animateTimes = 0;
const div = document.querySelector('#anim');
div.addEventListener('animationiteration', () => {
  animateTimes += 1;
});


function isPrimeNumber(number) {
  if (number === 1) {
    return { times: 1, result: false, anti: '' };
  }
  const max = Math.sqrt(number);
  for (let i = 2; i < max; i++) {
    if (number % i === 0) {
      return { times: i, result: false, anti: `${i} * ${number / i}` };
    }
  }
  return { times: Math.floor(max), result: true, anti: '' };
}

function getPrimeNumberCountUnder(max) {
  if (max < 2) {
    return 0;
  } else if (max < 3) {
    return 1;
  } else if (max < 5) {
    return 2;
  }
  let result = 2;
  for (let i = 5; i < max; i += 2) {
    if (isPrimeNumber(i).result) {
      result += 1;
    }
  }
  return result;
}

const max = 30000;
const times = 1000;

function doOneTask(number) {
  const start = Date.now();
  getPrimeNumberCountUnder(number);
  const time = Date.now() - start;
  accumulateTime += time;
  // console.log(`找到${number}以下的素数${data}个 计算耗时${Date.now() - start}`);
}

async function startSyncTask() {
  for (let i = 0; i < times; i++) {
    doOneTask(max);
  }
}

async function startTimeoutTask() {
  return new Promise(resolve => {
    let i = 0;
    const work = () => {
      if (i < times) {
        setTimeout(() => {
          doOneTask(max);
          work();
        });
        i++;
      } else {
        resolve();
      }
    };
    work();
  });
}

async function startIdleTask() {
  return new Promise(resolve => {
    let i = 0;
    const work = () => {
      if (i < times) {
        window.requestIdleCallback(deadline => {
          const remain = deadline.timeRemaining();
          if (remain > 10) {
            doOneTask(max);
            i++;
          } else {
            skipTimes++;
          }
          work();
        });
      } else {
        resolve();
      }
    };
    work();
  });
}

let accumulateTime = 0;

function statistics(taskName, allTime) {
  const avgTime = Math.round(accumulateTime / times);
  const mngTime = allTime - accumulateTime;
  console.log(`${taskName} 总耗时${allTime}, 任务累积耗时:${accumulateTime}, 单个任务均时${avgTime} 调度用时:${mngTime} 执行了${animateTimes}次动画`);
  console.log(`执行了${animateTimes}次动画， 本该执行${Math.floor(allTime / 2000)}次`);
}


async function doSyncTask() {
  accumulateTime = 0;
  animateTimes = 0;
  const start = Date.now();
  await startSyncTask();
  statistics('sync task', Date.now() - start);
}

async function doTimeoutTask() {
  animateTimes = 0;
  const start = Date.now();
  await startTimeoutTask();
  statistics('timeout task', Date.now() - start);
}

let skipTimes = 0;
async function doIdleTask() {
  skipTimes = 0;
  animateTimes = 0;
  const start = Date.now();
  await startIdleTask();
  statistics('timeout task', Date.now() - start);
  console.log(`跳过${skipTimes}次调度`);
}
