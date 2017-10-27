const Excel = require('exceljs');
const fs = require('fs');

const workbook = new Excel.Workbook();

const srcName = process.argv[2];
const sheetNum = Number(process.argv[3]) || 1;
const destFileName = `local-data/${srcName}${sheetNum}.temp.json`;

workbook.xlsx.readFile(`local-data/${srcName}.xlsx`)
    .then(() => {
        const list = [];
        workbook.getWorksheet(sheetNum).eachRow((row, rowNumber) => {
            if(rowNumber === 1){
                return;
            }
            const props = [];
            row.eachCell(cell => {
                props.push(String(cell.value));
            });
            const [name, ...triggers] = props;
            list.push({
                name, triggers,
            });
        });
        fs.writeFile(destFileName, JSON.stringify(list), (err) => {
            if(!err){
                console.log(`${destFileName} generated`);
            }
        });
    });