import nodeStreamZip = require('node-stream-zip');

const zip = new nodeStreamZip({
    file: 'local-data/demo.docx',
    storeEntries: true,
})


zip.on('ready', () => {
    const entrys = zip.entries();
    console.log(entrys);
})