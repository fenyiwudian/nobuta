// 省市区数据注入代码
var ASSIST = {};

ASSIST.mapCity = function (text) {
    const list = text.split('\n');
    const bbb = list.map(str => {
        const obj = {};
        const idMatch = str.match(/^\d+/);
        if (idMatch) {
            obj.id = idMatch[0];
        }
        const tierMatch = str.match(/TIER\s+=\s+(\d)/);
        if (tierMatch) {
            obj.tier = tierMatch[1];
        }
        const nameMatch = str.match(/[\u4e00-\u9fa5（）\/]+/);
        if (nameMatch) {
            obj.name = nameMatch[0];
        }
        return obj;
    });
    const ccc = bbb.filter(a => a.id);
    window.nodeManager.currentNode.options.forEach(opt => {
        const config = ccc.find(c => opt.text.endsWith(c.name));
        if (config) {
            opt.mapping.label = config.id;
            opt.mapping.field_1 = config.tier;
        }
    });
};

ASSIST.checkCityMap = function () {
    // 注入后检查代码
    const pureText = (text) => {
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.innerText;
    };
    window.nodeManager.currentNode.options.forEach(opt => {
        let label = opt.mapping.label || '';
        while (label.length < 3) { label += ' '; }
        console.log(
            label,
            opt.mapping.field_1 || ' ',
            pureText(opt.mapping.field_2),
            pureText(opt.mapping.field_3),
            pureText(opt.mapping.field_4),
            opt.text);
    });
};

/**
 * 快速自动为选中节点生成标签
 */
ASSIST.generateLabelAuto = function () {
    // 自动标签标号代码
    window.nodeManager.currentNode.options.forEach((opt, index) => {
        if (opt.isOtherOption) {
            opt.mapping.label = '97';
        } else {
            opt.mapping.label = String(index + 1);
        }
    });
};

/**
 * 快速为选中节点生成源于文字的标签
 */
ASSIST.generateLabelFromText = function (text) {
    const labelList = text.split('\n').filter(i => !!i);
    window.nodeManager.currentNode.options.forEach((opt, index) => {
        opt.mapping.label = labelList[index];
    });
};

/**
 * 快速为选中节点生成组名,组名放到映射属性1中
 */
ASSIST.generateGroupNameFromText = function (text) {
    const groupMatch = text.match(/GROUP\s+=\s+(.+?)\]/g);
    const groupList = groupMatch.map(match => {
        return match.match(/GROUP\s+=\s+(.+?)\]/)[1];
    });
    window.nodeManager.currentNode.options.forEach((opt, index) => {
        opt.mapping.field_1 = groupList[index] || '';
    });
};





/**
 * 快速从文本生成节点
 */
ASSIST.generateNodesFromText = (text) => {
    const nodeLines = text.split('\n').filter(i => !!i)
        ;
    const nodeCells = nodeLines.map(line => line.split('\t'));
    const nodeJsonList = [];
    const tempJson = null;
    nodeCells.forEach(line => {
        const name = line[0];
        if (name) {
            if (tempJson) {
                nodeJsonList.push(tempJson);
            }
            const tempJson = {
                questionText: line[1],
                nodeName: name,
                options: [],
                type: window.CF.EnumMain.NODE_TYPE.SELECT,
            };
        } else {
            tempJson.options.push({ text: line[1] });
        }
    });
    nodeJsonList.push(tempJson);
    const addedNodes = nodeJsonList.map(json => {
        return window.nodeManager.addNewNode({ nodeJson: json });
    });
    const connPairs = addedNodes.reduce((rs, a, index) => {
        const next = addedNodes[index + 1];
        if (next) {
            rs.push({ source: a.output, dest: next.input });
        }
        return rs;
    }, []);
    window.nodeManager.addConnectionsByPairs(connPairs);
    window.nodeManager.deselectAll();
    addedNodes.forEach(node => node.select());
    window.groupRectManager.handleGrouping('toggle');
    window.groupRectManager.currentGroup.title = addedNodes[0].nodeName.split('_')[0];
    window.groupRectManager.currentGroup.singlePage = true;
    window.groupRectManager.currentGroup.toggleCollapse();
};