const fs = require('fs');

const rescursiveReadDirSync = require('recursive-readdir-sync');

const files = rescursiveReadDirSync('./local-data/records');

let b5 = 'B5被跳过的:\n';
let b7 = 'B7被跳过的:\n';
let other ='无法统计的:\n';

files.forEach((path) => {
    const str = fs.readFileSync(path).toString();
    const responseId = path.match(/(.{36})\.csv/)[1];
    if(str.indexOf('自动跳过题目:[B5 RATE7:') > -1){
        b5 += responseId + '\n';
    }else if(str.indexOf('自动跳过题目:[B7:') > -1){
        b7 += responseId + '\n';
    }else{
        other += responseId + '\n';
    }
});

fs.writeFileSync('./local-data/classified.txt', b5 + '\n' + b7 + '\n' + other);

console.log('finished');