const Excel = require('exceljs');
const fs = require('fs');

const workbook = new Excel.Workbook();

const numKeyMap = {
    [1]: 'group',
    [2]: 'brand',
    [3]: 'type',
    [4]: 'systemLowPrice',
    [5]: 'sysTemHighPrice',
};

const srcName = process.argv[2];
const sheetNum = Number(process.argv[3]) || 1;
const destFileName = `${srcName}${sheetNum}.temp.js`;

workbook.xlsx.readFile(`/Users/cform/Documents/${srcName}.xlsx`)
    .then(() => {
        const sheet = workbook.getWorksheet(sheetNum);
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