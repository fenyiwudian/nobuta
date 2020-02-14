var propCount = 0;
var itemCount = 0;

var propObj = {};
var itemObj = [];

var addProp = function (count) {
  var startAt = new Date().getTime();
  var start = propCount;
  count = count || 1000;
  var end = propCount + count;
  for (; start < end; start++) {
    propObj[start] = true;
  }
  propCount = end;
  var endAt = new Date().getTime();
  console.log('add count: ', count);
  console.log('currnet count: ', end);
  console.log('cost time : ', endAt - startAt);
}


var getPropItem = function (key) {
  var startAt = new Date().getTime();
  console.log('item content: ', propObj[key]);
  var endAt = new Date().getTime();
  console.log('cost time : ', endAt - startAt);
}

var addItem = function (count) {
  var startAt = new Date().getTime();
  var start = itemCount;
  count = count || 1000;
  var end = itemCount + count;
  for (; start < end; start++) {
    itemObj.push(start);
  }
  itemCount = end;
  var endAt = new Date().getTime();
  console.log('add count: ', count);
  console.log('currnet count: ', end);
  console.log('cost time : ', endAt - startAt);
}


var getListItem = function (key) {
  var startAt = new Date().getTime();
  console.log('item content: ', itemObj[key]);
  var endAt = new Date().getTime();
  console.log('cost time : ', endAt - startAt);
}