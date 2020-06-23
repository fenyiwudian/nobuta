/* eslint-disable no-unused-vars */
var http = require('http');


const requestSync_2 = () => {
  return new Promise(resolve => {
    const req = http.request({
      host: 'localhost',
      port: 10003,
      path: '/plugin/da_tong_01.html',
      method: 'GET',
    }, (res) => {
      res.on('data', () => {
      });
      res.on('end', () => {
        resolve(222);
      });
    });

    req.end();
  });
};

// eslint-disable-next-line no-unused-vars
const reqeustSync_1 = () => {
  return new Promise(resolve => {
    const req = http.request({
      host: 'localhost',
      port: 10003,
      path: '/plugin/car.js',
      method: 'GET',
    }, (res) => {
      res.on('data', () => { });
      res.on('end', () => {
        requestSync_2().then(res => {
          resolve(res);
        });
      });
    });
    req.on('error', (err) => {
      console.log(err);
    });
    req.end();
  });
};

const timeoutSync_2 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('time out 2');
    }, 500);
  });
};


const timeoutSync_1 = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      timeoutSync_2().then(res => {
        resolve(res);
      });
    }, 500);
  });
};



const fn1 = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 100);
  });
};

const fn2 = () => {
  return new Promise(resolve => {
    setTimeout(function () {
      // eslint-disable-next-line no-undef
      a = b;
      resolve();
    }, 100);
  });
};

const fn3 = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 100);
  });
};


const main = () => {
  // reqeustSync_1().then(res => {
  //     console.log('request success', res);
  // }).then(() => {
  //     return timeoutSync_1().then(res => {
  //         console.log('timeout success', res);
  //         return res;
  //     });
  // }).catch(err => {
  //     console.log('outer catch err:', err);
  // });


  fn1().then(() => {
    return fn2();
  }).then(() => {
    return fn3();
  }).then(() => {
    console.log('ok');
  }).catch(err => {
    console.log('catched', err);
  });
};


main();