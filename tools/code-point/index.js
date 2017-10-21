const fs = require('fs');

let [,,start,end] = process.argv;

if(!start || !end){
    console.error(`no start or end specified: ${start} ${end}`);
    return;
}


start = Number(start);
end = Number(end);

if((!start && start !== 0) || (!end && end !== 0) || start > end){
    console.error(`incorrect start or end specified: ${start} ${end}`);
    return;
}

let result = '';
for(let i = start; i < end; i++){
    result += i.toString(16) + String.fromCodePoint(i)
    if( !(1 % 12)){
        result += '\n';
    }
}

fs.writeFile('./tools/code-point/char.log', result, function(err){
    if(!err){
        console.log(`see ${end - start} results in char.log`);
    }else{
        throw err;
    }
})
