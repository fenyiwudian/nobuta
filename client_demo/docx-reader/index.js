const input = document.querySelector('input');

input.onchange = () => {
    const file = input.files[0];

    window.JSZip.loadAsync(file).then((zip) => {
        zip.forEach((path, item) => {
            if (item.name === 'word/document.xml') {
                item.async('text').then(rs => {
                    console.log(rs);
                });
            }
        });
    });
};

const wait = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
};

document.querySelector('button').onclick = async function () {
    const start = Date.now();
    console.log('start');
    await wait();
    console.log('end, cost: ', Date.now() - start);
};