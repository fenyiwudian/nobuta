/**
 * 组合二维数组所有可能
 * @param {Array} listList 二维数组
 * @returns {Array} 所有可能
 */
function combine(listList) {
    var resultList = listList.shift().map(function (item) {
        return [item];
    });
    listList.forEach(function (list) {
        var partialLen = resultList.length;
        resultList.length *= list.length;
        for (var h = list.length - 1; h >= 0; h--){
            var item = list[h];
            var start = h * partialLen;
            var end = start + partialLen;
            for (var i = start; i < end; i++) {
                if (i < partialLen) {
                    resultList[i].push(item);
                } else {
                    resultList[i] = resultList[i % partialLen].map(function (temp) {
                        return temp;
                    });
                    resultList[i].push(item);
                }
            }
        }
    });
    resultList.forEach(function(list){
        console.log(list.toString());
    });
    return resultList;
}