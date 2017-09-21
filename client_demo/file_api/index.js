var express = require('express');
var app = express();
app.use(express.static('client'));
app.get('/', function(req, res){
    console.log(__dirname);
    res.sendFile('/client/index.html', {root: __dirname});
})

app.post('/upload', function(req, res){

})

app.listen(12346, function(){
    console.log('listening port 12346');
})