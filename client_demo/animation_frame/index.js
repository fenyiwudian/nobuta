
var calculate = function () {
  var startTime = new Date().getTime();
  var a = [];
  for (var i = 0; i < 80000; i++) {
    var index = Math.round(Math.random() * a.length);
    a.splice(index, 0, i);
  }
  var endTime = new Date().getTime();
  console.log(endTime - startTime);
};

var lastScrollHeight = 0;
var lastScrollTop = 0;
var inView = 0;
var outView = 0;

var getRect = function () {
  var scrollHeight = document.body.scrollHeight;
  var scrollTop = document.body.scrollTop;
  if (scrollHeight != lastScrollHeight || scrollTop != lastScrollTop) {
    inView = 0;
    outView = 0;
    var divList = document.getElementsByTagName('div');
    for (var i = 0; i < divList.length; i++) {
      var div = divList[i];
      var rect = div.getBoundingClientRect();
      if (rect.top >= window.innerHeight || rect.bottom <= 0) {
        outView++;
      } else {
        inView++;
      }
    }
    calculate();
    lastScrollHeight = scrollHeight;
    lastScrollTop = scrollTop;
  }
  console.log('in view: ' + inView + ' outView:' + outView);
};

var busy = function () {
  getRect();

  window.requestAnimationFrame(busy);
};

window.requestAnimationFrame(busy);


// var easy = function(){
//     console.log('easy');
//     window.requestAnimationFrame(easy);
// }

// window.requestAnimationFrame(easy)