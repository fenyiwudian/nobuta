
var files = [];

$('file').on('change', function (e) {
  console.log(e);
  files = e.target.files;
});

$('upload').on('click', function () {
  if (!files.length) {
    return;
  }
  $.post({
    url: '/upload',
    data: files[0]
  });
});