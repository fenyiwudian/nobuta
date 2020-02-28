const fs = require('fs');
const content = fs.readFileSync('local-data/json.json').toString();
const list = JSON.parse(content);
const lines = list.map(item => {
  return [item.triggers[0], item.icon, item.name, ...item.triggers];
}).map(item => item.join(','));
fs.writeFileSync('local-data/csv.csv', lines.join('\n'));