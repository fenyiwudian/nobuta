/**
 * promise then之后还是promise，
 * 后面的then接收到的内容是前一个then的resolve方法中返回的内容
 * 无论是promise内部还是resolve中发生任何错误，在该错误之后知道碰到catch的then中的resolve都不会被执行
 * 会直接进入到catchcatch中,
 * catch中接收到的是错误内容
 * catch后又是promise，该catch之后的then又会被执行。
 * then中resolve也和catch一样捕捉错误，但是无法捕捉到和自己一起的resolve中的错误
 * 
 */

Promise.resolve(1).then(function(res){
    console.log(res);
    a = b;
    // throw '111';
    // return 2;
},function(res){console.log('self catch' + res)}).then(function(res){
    console.log(res)
}).then(function(res){
    console.log(res);
}).catch(function(res){
    console.log('reject:' + res);
    return 'after rejected';
}).then(function(res){
    console.log(res);
})