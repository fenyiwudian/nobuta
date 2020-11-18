import { group, groupCollapsed } from 'console';
import fs = require('fs');
const text = fs.readFileSync('./backup/local-data/statistics.csv').toString();
const [head, title, ...lines] = text.split('\n');

interface IGroup {
  name: string;
  start: number;
  end: number;
  data: string[];
  extract(value: string, index: number): string;
}
function extractValue(value: string, index: number) {
  return value;
}
function headExtractFactory(judge: (value: number) => boolean) {
  return function (value: string, index: number) {
    if (judge(Number(value))) {
      return titleCells[index];
    }
  }
}

const extractors = [
  extractValue,
  extractValue,
  headExtractFactory((v) => v == 1),
  headExtractFactory((v) => v >= 3),
  headExtractFactory((v) => v >= 6),
  headExtractFactory((v) => v >= 4),
  extractValue,
  extractValue,
  headExtractFactory((v) => v >= 1),
]

let groups: IGroup[] = [];

const headCells = head.split(',');
const titleCells = title.split(',');

headCells.forEach((tt, index) => {
  // 列头不要
  if (index === 0) {
    return;
  }
  const formerGroup = groups[groups.length - 1];
  const text = tt.replace(/\s/g, '');
  if (text) {
    groups.push({
      name: text,
      start: index,
      end: index,
      data: [],
      extract: extractors[groups.length]
    });
    if (formerGroup) {
      formerGroup.end = index - 1;
    }
  } else if (index === headCells.length - 1 && formerGroup) {
    formerGroup.end = index;
  }
});

lines.forEach(line => {
  const cells = line.split(',');
  cells.forEach((cellValue, index) => {
    if (!cellValue) {
      return;
    }
    const group = groups.find(g => g.start <= index && index <= g.end);
    if (!group) {
      return;
    }
    const value = group.extract(cellValue, index);
    if (value) {
      group.data.push(value);
    }
  })
})
const beforeTipsData = groups[0].data.concat(groups[1].data);
const buyIntentData = groups[6].data.concat(groups[7].data);
const result = fs.readFileSync('./backup/local-data/models.txt').toString().split('\n')
  .map(model => {
    const filterFn = (d: string) => d.includes(model);;
    const myBeforeTipsData = beforeTipsData.filter(filterFn);
    const myAfterTipsData = groups[2].data.filter(filterFn);
    const myFamiliarData = groups[3].data.filter(filterFn);
    const myImageData = groups[4].data.filter(filterFn);
    const myBuyConsiderData = groups[5].data.filter(filterFn);
    const myBuyConetntData = buyIntentData.filter(filterFn);
    const mySuggestData = groups[8].data.filter(filterFn);
    const spread = (myBeforeTipsData.length / lines.length * 0.5)
      + (myAfterTipsData.length / lines.length * 0.1)
      + (myFamiliarData.length / lines.length * 0.4)
    const need = (myImageData.length / lines.length * 0.32)
      + (myBuyConsiderData.length / lines.length * 0.28)
      + (myBuyConetntData.length / lines.length * 0.15)
      + (mySuggestData.length / lines.length * 0.25);
    return [model, spread, need].join();
  });

const resultText = result.join('\n');

fs.writeFileSync('./backup/local-data/group.csv', resultText);




