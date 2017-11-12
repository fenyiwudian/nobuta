const Excel = require('exceljs');
const fs = require('fs');

const workbook = new Excel.Workbook();

const numKeyMap = {
    [1]: 'r',
    [2]: 'p',
    [3]: 'c',
};

const srcName = process.argv[2];
const sheetNum = Number(process.argv[3]) || 1;
const destFileName = `local-data/${srcName}${sheetNum}.temp.js`;

workbook.xlsx.readFile(`local-data//${srcName}.xlsx`)
    .then(() => {
        const sheet = workbook.getWorksheet(sheetNum);
        const list = [];
        sheet.eachRow((row, rowNumber) => {
            if(rowNumber === 1){
                return;
            }
            const car = {
                g: [],
            };
            row.eachCell((cell, number) => {
                const key = numKeyMap[number];
                if(key){
                    car[key] = String(cell.value);
                }else{
                    car.g.push(String(cell.value));
                }
            });
            list.push(car);
        });
        const obj = {};
        const groupMap = [];
        list.forEach(item => {
            if(obj[item.r]){
                obj[item.r].l.push(item);
            }else{
                obj[item.r] = {
                    l: [item]
                };
            }
            item.g = item.g.map(group => {
                const index = groupMap.indexOf(group);
                if(index < 0){
                    groupMap.push(group);
                    return groupMap.length - 1;
                }else{
                    return index;
                }
            });
            delete item.r;
        });
        const str = `
        const groupMap = ${JSON.stringify(groupMap).replace(/"/g, '\'')};
        const regions = ${JSON.stringify(obj).replace(/"/g, '\'')};
        module.exports = {
            groupMap,
            regions
        }`;
        fs.writeFile(destFileName, str, (err) => {
            if(!err){
                console.log(`${destFileName} generated`);
            }
        });
    });