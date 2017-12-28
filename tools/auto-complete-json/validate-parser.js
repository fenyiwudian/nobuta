const Excel = require('exceljs');
const fs = require('fs');

const workbook = new Excel.Workbook();

const numKeyMap = {
    [1]: 'b',
    [2]: 'group',
    [3]: 'brand',
    [4]: 'type',
    [5]: 'LP',
    [6]: 'HP',
};

const srcName = process.argv[2];
const destFileName = `local-data/${srcName}.temp.js`;

workbook.xlsx.readFile(`local-data/${srcName}.xlsx`)
    .then(() => {
        const sheet = workbook.getWorksheet(1);
        const list = [];
        sheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) {
                return;
            }
            const car = {};
            row.eachCell((cell, number) => {
                const key = numKeyMap[number];
                if (key) {
                    car[key] = String(cell.value);
                }
            });
            list.push(car);
        });
        const json = JSON.stringify(list)
            .replace(/"(b|group|brand|type|LP|HP)"/g, '$1');
        const str = `module.exports = ${json};`;
        fs.writeFile(destFileName, str, (err) => {
            if (!err) {
                console.log(`${destFileName} generated`);
            }
        });
    });