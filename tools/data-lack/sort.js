const fs = require('fs');

const rescursiveReadDirSync = require('recursive-readdir-sync');

const files = rescursiveReadDirSync('./local-data/records');

files.forEach((path) => {
    const str = fs.readFileSync(path).toString();
    const lines = str.split('\n');
    const newLines = lines.map(line => {
        return {
            value: line,
            time: line.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{1,3}/)
        };
    }).sort((a, b) => {
        return a.time > b.time ? 1 : -1;
    }).map(item => {
        return item.value;
    });

    const newStr = newLines.join('\n');
    fs.writeFileSync(path, newStr);
});

console.log('finished');