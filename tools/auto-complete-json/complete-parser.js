const Excel = require('exceljs');
const fs = require('fs');

const workbook = new Excel.Workbook();

const srcName = process.argv[2];
const destFileName = `${srcName}.temp.json`;

workbook.xlsx.readFile(`/Users/cform/Documents/${srcName}.xlsx`)
    .then(() => {
        const list = [];
        workbook.getWorksheet(1).eachRow((row, rowNumber) => {
            if(rowNumber === 1){
                return;
            }
            const props = [];
            row.eachCell(cell => {
                props.push(cell.value);
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