$(function(){
    var dataStr = '';
    window.list.filter(function(item){
        return item.data_length > 1024 * 1024;
    }).sort(function(a, b){
        return a.data_length < b.data_length ? 1 : -1;
    }).forEach(function(item){
        var total = item.data_length + item.index_length - item.data_free;
        var str = `<div>
            <div>${item.table_schema}</div>
            <div>${item.table_name}</div>
            <div>${item.data_length/ 1024 / 1024}MB</div>
            <div>${item.index_length/ 1024 / 1024}MB</div>
            <div>${item.data_free / 1024 / 1024}MB</div>
            <div>${total / 1024 / 1024}MB(${total / 1024 / 1024 / 1024}GB)</div>
        </div>`;
        dataStr += str;
    });
    $('#data-table').append(dataStr);
});