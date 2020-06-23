var img = document.getElementById('img');

img.onload = function () {
  var canvas = document.getElementById('canvas');
  canvas.width = 100;
  canvas.height = 100;
  canvas.getContext('2d').drawImage(img, 0, 0);
  var downloadCustom = document.getElementById('download_custom');
  downloadCustom.setAttribute('href', canvas.toDataURL());
};

var getBase64 = function (elem, width, height) {
  html2canvas(elem || document.body, {
    useCORS: true,
    width: width || 100,
    height: height || 100,
  }).then(function (canvas) {
    var base64 = canvas.toDataURL();
    console.log(base64);
    var image = document.createElement('img');
    image.setAttribute('src', base64);
    document.body.appendChild(image);
  });
};

