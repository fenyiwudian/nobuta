const Excel = require('exceljs');
const fs = require('fs');

const workbook = new Excel.Workbook();

const numKeyMap = {
    [1]: 'group',
    [2]: 'segment',
    [3]: 'brand',
    [4]: 'type',
    [5]: 'officalLowPrice',
    [6]: 'officalHighPrice',
    [7]: 'systemLowPrice',
    [8]: 'sysTemHighPrice',
};

const srcName = process.argv[2];
const destFileName = `${srcName}.temp.js`;

workbook.xlsx.readFile(`/Users/cform/Documents/${srcName}.xlsx`)
    .then(() => {
        const sheet = workbook.getWorksheet(1);
        const list = [];
        sheet.eachRow((row, rowNumber) => {
            if(rowNumber === 1){
                return;
            }
            const car = {};
            row.eachCell((cell, number) => {
                const key = numKeyMap[number];
                if(key){
                    car[key] = cell.value;
                }
            });
            list.push(car);
        });
        const str = `module.exports = ${JSON.stringify(list).replace(/"/g, '\'')};`;
        fs.writeFile(destFileName, str, (err) => {
            if(!err){
                console.log(`${destFileName} generated`);
            }
        });
    });