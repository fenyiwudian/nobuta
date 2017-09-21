//             1     2  3       4   5       6              7    8       9       10          11          12          13          14      15           16     17  18      19      20      21              
const str = `time	ip	cost	key	unionid	大通openid	请打分	 外观	乘坐空间	乘坐舒适度	后备箱空间	上下班通勤	全家出游	商务接待	运输行李或物品	选择项	请打分	姓名	短信验证	选择项	选择项
2017-09-20 14:17:23	180.*.*.203	69	a001747	owkvfsmUlSYOiZY5Tik-x7CxtcfI	oAgNVwmBmtCPoPm7PZWp-jnITqe8	5	1	0	0	0	0	0	1	0	当然会	5	蔡大神	18721824568	上海市-上海市-浦东新区	25万以上
2017-09-19 21:47:23	112.*.*.41	65	a006988	owkvfsjSnvCSML-nyQCATChFMEhk	oAgNVwoi9rashnQbcocom07hZKW8	5	1	1	0	0	0	1	0	0	当然会	5	王家瑞	13074123896	辽宁省-大连市-甘井子区	10-15万
2017-09-19 17:42:42	180.*.*.203	74	a001747	owkvfsvIS5mUDMiELFipjIreCRSo	oAgNVwtU2AJ4ZYGxAwfXyj-PKxG8	4	1	1	0	0	1	1	0	0	需要进一步考虑	4	张三	18502109792	上海市-上海市-浦东新区	15-20万
2017-09-19 14:58:15	223.*.*.37	57	a006988	owkvfsuP_yDvivPossa8cant5IbM	oAgNVwsAMC7m05hAfLa-7x9G3RAE	5	0	1	0	0	0	0	1	0	当然会	5	徐小明	13795117101	辽宁省-大连市-甘井子区	20-25万
2017-09-19 13:23:23	27.*.*.194	88	a001436	owkvfshxmzIggLn22rzuXlmnCCWQ	oAgNVwnMtw_KXUualjts5r7ahPDM	5	1	0	0	0	1	0	0	0	当然会	5	上有	13816698587	上海市-上海市-黄浦区	10-15万
2017-09-19 11:23:35	223.*.*.248	19	a002286	owkvfsgaFcSreI2HG8zO9xUSM0QE	oAgNVwusb0P9p1IOBvoGKUSXnkHI	5	0	0	1	0	0	1	0	0	需要进一步考虑	5	杨财	13587945168	浙江省-湖州市-德清县	15-20万
2017-09-19 10:07:01	49.*.*.61	88	a006935	owkvfsrYyqqry6Bq5T66XMbqIwcs	oAgNVwksWyvsQgB5feeKqfqkvNyo	5	1	0	0	0	1	0	0	0	当然会	5	柳景云	18698721180	辽宁省-大连市-沙河口区	25万以上
2017-09-19 09:47:26	42.*.*.212	156	a006983	owkvfsqtahxk0LYI-YfdAGtw2U7A	oAgNVwl4Aa3USWa_a2zzaGfWpuPQ	5	1	1	1	0	0	0	1	0	需要进一步考虑	5	Zhangli	15542571226	辽宁省-大连市-中山区	15-20万
2017-09-19 09:05:21	106.*.*.189	100	a002283	owkvfspkx87Voe3nKtG2DzGTkmMQ	oAgNVwr7rxPZlI8E-WT6oQik2iAQ	5	1	1	0	0	1	1	0	0	需要进一步考虑	5	张志革	13833458999	河北省-石家庄市-辛集市	10-15万
2017-09-19 08:55:30	223.*.*.139	58	a002283	owkvfsmiLDjRutyRR1dcPFIkWUas	oAgNVwjNROMMaJ1ynpF1cfdXIjko	5	1	1	0	0	1	1	0	0	需要进一步考虑	5	李晓军	13483682686	河北省-石家庄市-辛集市	10-15万
2017-09-18 22:44:45	42.*.*.69	74	a007149	owkvfsu0YtnqAe16ZDJL6qiQbJvw	oAgNVwp2vi58ZfbZo_486taR0Es4	5	0	1	0	0	0	1	0	0	需要进一步考虑	2	太子	17758815793	黑龙江省-哈尔滨市-道里区	25万以上
2017-09-18 22:40:54	112.*.*.195	102	a007149	owkvfsvC3HNoFdyyiplzK02hUXIE	oAgNVwu2nqbbbT2su_latQDeg0mY	5	0	1	0	0	0	1	1	1	需要进一步考虑	3	闫小丽	18686758773	黑龙江省-哈尔滨市-道里区	25万以上`;


const lines = str.split('\n');
const head = lines.shift().split('\t');
const dataList = lines.map(line => {
    const props = line.split('\t');
    let select_1 = '';
    for (let i = 7; i < 12; i++) {
        if (props[i] == 1) {
            select_1 += head[i] + ' ';
        }
    }

    let select_2 = '';
    for (let i = 12; i < 16; i++) {
        if (props[i] == 1) {
            select_2 += head[i] + ' ';
        }
    }

    return {
        time: new Date(props[0]).getTime() - props[2] * 1000,
        key: props[3],
        unionId: props[4],
        openId: props[5],
        mark_1: props[6],
        select_1: select_1.trim(),
        select_2: select_2.trim(),
        select_3: props[15],
        mark_2: props[16],
        select_4: props[20],
        mix: `${props[17]} ${props[18]} ${props[19]}`
    }
});

const urlTpl = 'http://localhost:10003/plugin/da_tong_01.html?scenseId=${key}&openId=${openId}&unionId=${unionId}&answerTime=${time}&answer1=${mark_1}&answer2=${select_1}&answer3=${select_2}&answer4=${select_3}&answer5=${select_4}&answer6=${mark_2}&answer7=${mix}'


const urlList = dataList.map(data => {
    let url = urlTpl;
    Object.keys(data).forEach(key => {
        url = url.replace('${' + key + '}', encodeURIComponent(data[key]));
    })
    return url;
})

const listHtml = urlList.reduce((html,url,index) =>{
    return html + `<li><a href="${url}">${dataList[index].mix}  ${dataList[index].key}</a></li>`;
}, '');

const html = `<ul>${listHtml}</ul>`;
$(document.body).append(html);


