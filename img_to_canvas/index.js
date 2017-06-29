var img = document.getElementById('img')

img.onload = function () {
    var canvas = document.getElementById('canvas')

    canvas.width = img.width;
    canvas.height = img.height;

    canvas.getContext('2d').drawImage(img, 0, 0);
}

