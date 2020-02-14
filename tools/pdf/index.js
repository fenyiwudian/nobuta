const pdf = require('pdfreader');
const rx = require('recursive-readdir-sync');

const files = [rx('local-data/paper')[0]];

let fileCount = files.length;

const list = [];

const receive = (item) => {
  list.push(item);
  if (list.length === fileCount) {
    console.log('print');
    print();
  }
};

const print = () => {
  let text = '';
  text += 'code        price       prices \n';
  let total = 0;
  list.forEach(item => {
    text += item.code + '        ' + item.price + '       ' + item.prices.join(',') + '      ' + item.name + '\n';
    total += item.price;
  });

  text += `total count: ${list.length} total price: ${total}`;

  console.log(text);
};

files.forEach(file => {
  if (!file.endsWith('.pdf')) {
    fileCount--;
    return;
  }
  const data = {};
  const prices = [];
  new pdf.PdfReader().parseFileItems(file, function (err, item) {
    if (!item) {
      const name = file.replace(/\\/g, '/');
      data.name = name.substr(name.lastIndexOf('/') + 1);
      data.price = Math.max.apply(null, prices);
      data.prices = prices;
      receive(data);
    } else if (item.text) {
      if (item.text.match(/^\d{8}$/)) {
        data.code = item.text;
      } else if (item.text.startsWith('¥')) {
        prices.push(Number(item.text.substr(1)));
      }
      console.log(item.text, item.x, item.y);
    }
  });
});

