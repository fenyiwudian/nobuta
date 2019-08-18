const button = document.getElementById('generate');
var canvas = document.getElementById('canvas');
button.onclick = () => {
    var ctx = canvas.getContext('2d');
    var data = '<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="2000">' +
        `<g>
            <rect width='100' height='100' fill='red'></rect>
        </g>
        <g>
            <rect width='100' height='100' fill='green' x='400'></rect>
        </g>` +
        '</svg>';
    var DOMURL = window.URL;
    var img = new Image();
    var svg = new Blob([data], { type: 'image/svg+xml' });
    var url = DOMURL.createObjectURL(svg);
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);
    };
    img.src = url;
    document.body.append(img);
};

// const upload = (file, filename, key, token) => {

//     const formData = new FormData();
//     formData.append('key', key || filename);
//     formData.append('token', token);
//     formData.append('file', file, filename);

//     //注意不要设置content-type,浏览器自动会填充 
//     return $.ajax('https://up.qbox.me', {
//         method: 'POST',
//         data: formData,
//     });
// };

// canvas.toBlob(blob => {
//     const filename = Date.now() + Math.random() + '.png';
//     upload(blob, filename);
// }, 'image/png');