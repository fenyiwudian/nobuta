const sortable = new Sortable.default(document.querySelector('ul'), {
  draggable: 'li',
  // classes: {
  //     'container:dragging': 'draggable-container--is-dragging',
  //     'source:dragging': 'draggable-source--is-dragging',
  //     'source:placed': 'draggable-source--placed',
  //     'container:placed': 'draggable-container--placed',
  //     'body:dragging': 'draggable--is-dragging',
  //     'draggable:over': 'draggable--over',
  //     'container:over': 'draggable-container--over',
  //     'source:original': 'draggable--original',
  // }
});

sortable.on('sortable:start', (e) => console.log('sortable:start', e));
sortable.on('sortable:sort', (e) => console.log('sortable:sort', e));
sortable.on('sortable:sorted', (e) => console.log('sortable:sorted', e));
sortable.on('sortable:stop', (e) => console.log('sortable:stop', e));


var input = document.querySelector('input');

var value = localStorage.getItem('hehe') || '';

input.value = value;

input.addEventListener('input', function () {
  localStorage.setItem('hehe', input.value);
});