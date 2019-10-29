/**
 * promise then之后还是promise，
 * 后面的then接收到的内容是前一个then的resolve方法中返回的内容
 * 无论是promise内部还是resolve中发生任何错误，在该错误之后知道碰到catch的then中的resolve都不会被执行
 * 会直接进入到catchcatch中,
 * catch中接收到的是错误内容
 * catch后又是promise，该catch之后的then又会被执行。
 * then中reject也和catch一样捕捉错误，但是无法捕捉到和自己一起的resolve中的错误
 * 
 */
// function violentError(){
//     //a = b;
//     throw {error:'true', message:'bad'};
// }

// Promise.resolve(1).then(function(res){
//     console.log(res);
//     violentError();
//     // a = b;
//     // throw '111';
//     // return 2;
// },function(res){console.log('self catch' + res)}).then(function(res){
//     console.log(res)
// },function(res){console.log('inner catch' + res); return 'reborn';}).then(function(res){
//     console.log(res);
// }).catch(function(res){
//     console.log('reject:', res);
//     throw 'error from former catch';
//     //return 'after rejected';
// }).then(function(res){
//     console.log(res);
// }).catch(function(res){
//     console.log('error again', res)
// });




/**
 * 一连串的promise 同步流中的错误都能被最后的catch抓出,
 * 但是一旦异步运行的错误是无法被后面的catch抓出的(除非异步代码抓出try-catch抓出错误后再reject),
 * 不过异步代码中的错误可以被全局错误抓出
 */


const fn1 = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 100);
    });
};

const fn2 = () => {
    return new Promise(resolve => {
        // c = dd;
        setTimeout(function () {
            // a =b;
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
    fn1().then(() => {
        return fn2();
    }).then(() => {
        return fn3();
    }).then(() => {
        console.log('ok');
    }).catch(err => {
        console.log('catched by promise', err);
    });
};

window.onerror = (err) => {
    console.log('global', err);
};


main();



// 按照标准then中的回调虽然是异步,但是和setTimout的异步不同,then的异步是微任务,setTimeout的异步是宏任务
// 微任务会在宏任务之前执行
// 有些的promise-polyfill是用setTimeout实现的then异步所有导致它们的then异步也变成了宏任务.
// 这也是没办法的事情,因为老的浏览器都不支持以javascript编程的方式是创建一个微任务,
// 所有使用polyfill的promise和使用原生的promise会有一些不同

function testPromise(PromiseClass) {
    console.log('test');
    setTimeout(() => {
        console.log(0);
    });
    console.log(1);

    new PromiseClass((resolve) => {
        console.log(2);
        resolve();
    }).then(() => {
        console.log(3);
    }).then(() => {
        console.log(4);
    });
    console.log(5);
}
// 使用原生输入,输出顺序1 2 5 3 4 0
testPromise(Promise);
// 使用ES6promise的polyfill要看情况,如果浏览器支持MutationObserver或MessageChannel
// 则会使用这两个机制设置异步的微任务,就会输出1 2 5 3 4 0
// 否则只能使用setTimeout设置异步宏任务,就会输出1 2 3 0 3 4
testPromise(window.ES6Promise);
// 