import nodeStreamZip = require('node-stream-zip');
import fs = require('fs');

// 流程原理参照：https://www.npmjs.com/package/node-stream-zip

// 大概就是.docx文档本质上是一个压缩文件，解压后能得到一系列文件，而文本内容在word/document.xml文件中。
// 从中读出内容，在格式中抽出文本即可。

// 内存解压word文档
const zip = new nodeStreamZip({
  file: 'local-data/demo.docx',
  storeEntries: true,
})

// 解压准备好后
zip.on('ready', () => {
  let content = '';
  const chunks: Uint8Array[] = [];
  // 读取解压出来的文本内容包含文件
  zip.stream('word/document.xml', (err, stream: fs.ReadStream) => {
    if (err) {
      throw err;
    }

    stream.on('data', (chunk) => {
      console.log('on data');
      chunks.push(chunk)
    });
    stream.on('end', () => {
      content = Buffer.concat(chunks).toString();
      // 读出来的文本是一个xml，文本内容被包含在<w:t></w:t>标签中，正则表达式抽取。
      const match = content.match(/<w:t>.+?<\/w:t>/g);
      if (match) {
        const lines = match.map(item => {
          return item.substring(5, item.length - 7);
        });
        console.log(lines.join('\n'));
      }

      zip.close();

    })
  })

})