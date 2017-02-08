var container = document.getElementById('container');
var first = document.getElementById('first');
var range = new Range();
range.setStartAfter(first);
range.setEndAfter(first);
var newSpan = document.createElement('span');
newSpan.style.backgroundColor = 'yellow';
newSpan.innerText = 'hehe';
// range.insertNode(newSpan);