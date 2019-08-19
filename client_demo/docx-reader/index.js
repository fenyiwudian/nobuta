const input = document.querySelector('input');

input.onchange = () => {
    const file = input.files[0];

    window.JSZip.loadAsync(file).then((zip) => {
        zip.forEach((path, item) => {
            if (item.name === 'word/document.xml') {
                item.async('text').then(rs => {
                    const match = rs.match(/<w:t>.+?<\/w:t>/g);
                    if (match) {
                        const lines = match.map(item => {
                            return item.substring(5, item.length - 7);
                        });
                        console.log(lines.join('\n'));
                    }
                });
            }
        });
    });

};