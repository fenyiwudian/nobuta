var container = document.getElementById('container');
// var first = document.getElementById('first');
// var range = new Range();
// range.setStartAfter(first);
// range.setEndAfter(first);
// var newSpan = document.createElement('span');
// newSpan.style.backgroundColor = 'yellow';
// newSpan.innerText = 'hehe';

// container.addEventListener('focus',function(){
//     var selection = window.getSelection();
//     console.log(selection);
// })

// for (var i = 0; i < 4; i++) {
//     var assistant_1 = document.createElement('span');
//     container.appendChild(assistant_1);
//     var span = document.createElement('span');
//     span.innerText = 'span_' + i;
//     span.style.backgroundColor = 'lightcyan';
//     span.style.marginLeft = '2px';
//     span.style.marginRight = '2px';
//     span.setAttribute('contenteditable', 'false');
//     container.appendChild(span);
//     var assistant_2 = document.createElement('span');
//     container.appendChild(assistant_2);
// }

// var moveCaretToLast = function (element, selection) {
//     selection = selection || window.getSelection();
//     // 我们尝试在末尾生成一个光标
//     // 新建一个范围
//     var range = document.createRange();
//     // 添加一个辅助标签到末尾
//     var assistant = document.createElement('span');
//     element.appendChild(assistant);
//     // 将范围放到该辅助元素的前面
//     range.setStart(assistant, 0);
//     // 移除原有的选择
//     selection.removeAllRanges();
//     // 设置选择我们新建的范围
//     selection.addRange(range);
//     // 移除辅助元素
//     assistant.parentNode.removeChild(assistant);
// };