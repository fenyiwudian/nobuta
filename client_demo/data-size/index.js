$(function () {

    var split = function (number) {
        var arr = Math.round(number).toString().split('');
        var arr2 = [];
        for (var i = 1; i <= arr.length; i++) {
            var index = arr.length - i;
            arr2.unshift(arr[index]);
            if (i % 3 === 0 && index !== 0) {
                arr2.unshift(',');
            }
        }
        return arr2.join('');
    };

    var groups = {};

    var dataStr = '';
    window.list.filter(function (item) {
        return item.data_length > 0 || item.index_length > 0;
    }).sort(function (a, b) {
        return a.data_length < b.data_length ? 1 : -1;
    }).forEach(function (item) {

        var total = item.data_length + item.index_length;
        var str = `<div>
            <div>${item.table_schema}</div>
            <div>${item.table_name}</div>
            <div>${split(item.data_length)}B</div>
            <div>${split(item.index_length)}B</div>
            <div>${split(item.data_free)}B</div>
            <div>${split(total)}B}</div>
        </div>`;
        dataStr += str;

        var group = groups[item.table_schema];
        if (!group) {
            group = groups[item.table_schema] = {
                name: item.table_schema,
                data_length: 0,
                index_length: 0,
                data_free: 0,
                table_counts: 0,
            };
        }
        group.data_length += item.data_length;
        group.index_length += item.index_length;
        group.data_free += item.data_free;
        group.table_counts += 1;

    });
    $('#data-table').append(dataStr);

    var groupStr = '';

    var all = {
        name: '全部',
        table_counts: 0,
        data_length: 0,
        index_length: 0,
        data_free: 0,
        total: 0,
    };

    Object.keys(groups).forEach(function (key) {
        var item = groups[key];
        var total = item.data_length + item.index_length;
        var str = `<div>
            <div>${item.name}</div>
            <div>${item.table_counts}</div>
            <div>${split(item.data_length)}B</div>
            <div>${split(item.index_length)}B</div>
            <div>${split(item.data_free)}B</div>
            <div>${split((total))}B</div>
        </div>`;
        all.table_counts += item.table_counts;
        all.data_length += item.data_length;
        all.index_length += item.index_length;
        all.data_free += item.data_free;
        all.total += total;
        groupStr += str;
    });

    groupStr += `<div>
        <div>${all.name}</div>
        <div>${all.table_counts}</div>
        <div>${split(all.data_length)}B</div>
        <div>${split(all.index_length)}B</div>
        <div>${split(all.data_free)}B</div>
        <div>${split((all.total))}B</div>
    </div>`;

    $('#data-base').append(groupStr);
});