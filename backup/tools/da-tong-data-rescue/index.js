//             1     2  3       4   5       6              7    8       9       10          11          12          13          14      15           16     17  18      19      20      21              
let str = `time	ip	cost	key	unionid	大通openid	请打分	 外观	乘坐空间	乘坐舒适度	后备箱空间	上下班通勤	全家出游	商务接待	运输行李或物品	选择项	请打分	姓名	短信验证	选择项	选择项
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


str = `time	ip	cost	key	unionid	大通openid	请打分	 外观	乘坐空间	乘坐舒适度	后备箱空间	上下班通勤	全家出游	商务接待	运输行李或物品	选择项	请打分	姓名	短信验证	选择项	选择项
2017-10-12 20:49:09	202.*.*.78	70	a001747	owkvfsnkyGrQeN1_DpYng8eSe4O0	oAgNVwhI7Iog9InBoOi9eQ5UTfKo	5	0	0	0	1	0	0	0	1	当然会	5	测试	18017009341	上海市-上海市-徐汇区	15-20万
2017-10-12 20:48:51	61.*.*.105	146	a006441	owkvfshVTcN-6lfqm0czek5fr4qU	oAgNVwt1WUl75_sH8gfu7-wCoVgg	5	1	1	1	1	0	1	0	0	当然会	5	倪妮	13264069921	北京市-北京市-昌平区	25万以上
2017-10-12 20:38:35	202.*.*.78	71	a001747	owkvfssquUv495Hd9ePaoOMZj4vc	oAgNVwn7TyhYaO-nTdI3zwIcz2nQ	5	1	0	0	0	1	0	0	0	当然会	5	test	17317112731	上海市-上海市-徐汇区	10-15万
2017-10-12 20:37:21	223.*.*.42	174	a006975	owkvfsuhaOGU5CR26l3w7N5drPRo	oAgNVwiQR-ChThXK9DSMRndJ2bY0	5	1	0	0	0	1	0	0	0	当然会	5	林成成	13624096685	辽宁省-大连市-沙河口区	25万以上
2017-10-12 20:35:04	175.*.*.79	46	a006975	owkvfskhb4FNCTuPpTOdkEiqFIAQ	oAgNVwsy98Wn9RtH9i8vtkG50Ssk	5	1	0	0	0	1	0	0	0	需要进一步考虑	5	空军建军节	18642820543	辽宁省-大连市-沙河口区	15-20万
2017-10-12 20:34:01	175.*.*.54	164	a010558	owkvfsuTuONd4Y-Sso-jTnVR39Ag	oAgNVwsflQDPNukpPcOMZGpNLJh0	5	1	1	1	1	1	1	1	1	当然会	5	好好	13387894533	辽宁省-大连市-甘井子区	10-15万
2017-10-12 20:04:17	223.*.*.217	68	a001747	owkvfsrexw-0Fnh-zD5lP6Wsyi8g	oAgNVwhdxFOZ_QYUdWTTFei7RRgg	4	0	1	0	0	0	0	1	0	不会	4	张凯	18502109792	上海市-上海市-松江区	
2017-10-12 19:57:59	1.*.*.45	61	a006988	owkvfst9aLQ1WcxcgE1BDtfFnIfk	oAgNVwtexDppNwwUYmkKBaMvh_D4	5	1	1	0	0	1	1	0	0	需要进一步考虑	5	王立宏	15566850108	辽宁省-大连市-甘井子区	10-15万
2017-10-12 19:53:06	175.*.*.6	105	a006991	owkvfsoG2AAqIGOphVgljjmhGijo	oAgNVwqAgwOXZzkkLqT4mUURzfRY	5	0	1	1	0	0	1	1	0	需要进一步考虑	5	刘礼	15502622969	辽宁省-大连市-西岗区	20-25万
2017-10-12 19:51:21	103.*.*.13	94	a006981	owkvfss-jkyXZJoiPgSfz1_E6HGs	oAgNVwgFVP08hK2nK28feonKCW_0	5	0	1	0	0	0	1	0	0	需要进一步考虑	5	杨翰	13477235557	广西壮族自治区-北海市-银海区	15-20万
2017-10-12 19:37:35	113.*.*.30	73	a006979	owkvfsiNdSv-jBsyxog2Gqa2GnB8	oAgNVwtV3azWF2d7Y1E_B9-MyyF0	5	1	1	1	1	0	1	1	1	需要进一步考虑	5	张霖	13704110248	辽宁省-大连市-甘井子区	20-25万
2017-10-12 19:36:39	175.*.*.96	91	a006979	owkvfsivucY1r34kTPBGBK9LYJ9Q	oAgNVwiMRYLp_ym4AN-ObCiAYF84	5	1	0	0	0	0	1	0	0	当然会	5	王玥	13204051262	辽宁省-大连市-甘井子区	15-20万
2017-10-12 19:36:22	175.*.*.44	115	a010558	owkvfsvpy4aa2Uq5q1A_Hf7lsWk8	oAgNVwsWQEkvPTENYEDzSV1bg37I	5	1	1	0	0	1	1	0	0	当然会	5	芳芳	15242654397	辽宁省-大连市-甘井子区	10-15万
2017-10-12 19:36:00	175.*.*.149	84	a010393	owkvfsjGbIxpc2Puzl8kEQtKxRno	oAgNVwsrWMOQZBkumv7Dm2MZJMtA	5	1	1	1	1	1	1	1	1	当然会	5	张伟	15504949234	辽宁省-大连市-甘井子区	15-20万
2017-10-12 19:34:22	175.*.*.4	107	a010558	owkvfslh5VdigXOyPy0OyNSiaXkc	oAgNVwmS_mSOOHJwAVtAQcL5Oyaw	5	1	1	0	1	1	0	1	1	当然会	5	裴乃倬	15668689517	辽宁省-大连市-甘井子区	15-20万
2017-10-12 19:27:10	175.*.*.80	48	a006990	owkvfsonBh2pVgWgDnYiP7_Jz1e0	oAgNVwsCVoE-1UJ2xcGDAT1r2TcM	5	1	0	0	0	1	0	0	0	当然会	5	杜磊	18640994966	辽宁省-大连市-甘井子区	10-15万
2017-10-12 19:03:11	42.*.*.240	82	a010270	owkvfsiyyevIXBY3Xxjz96QXNpMo	oAgNVwk-GluVmGXQ8NOTqiyj7-pA	5	1	0	0	0	1	1	1	1	当然会	5	王海	18624280277	辽宁省-大连市-甘井子区	20-25万
2017-10-12 19:02:20	223.*.*.161	106	a010393	owkvfsuLHmAHRVgPQlEL8dkhuCQ8	oAgNVwhjGd28YrN1Anqo1CWC4mi4	5	1	0	0	0	1	0	0	0	需要进一步考虑	5	陈智海	15942621692	辽宁省-大连市-西岗区	10-15万
2017-10-12 19:01:44	116.*.*.7	112	a010667	owkvfsmpg_iHIVSLXdexxMSrKmeo	oAgNVwnRaLZ_CYhlBGxwUHOLOMdc	5	0	1	0	0	0	1	0	0	当然会	5	陈设	15011751173	广东省-广州市-天河区	15-20万
2017-10-12 19:01:12	14.*.*.190	48	a010667	owkvfspsv8Lz7Y2cdQBLUqK_G_Ks	oAgNVwglLyMTff6gEfTAukwGPytg	5	1	0	0	0	1	0	0	0	当然会	5	李大宝	13318788529	广东省-广州市-白云区	10-15万
2017-10-12 18:59:51	14.*.*.112	48	a010667	owkvfst3d4jMttNPp0RGDmmBkVRY	oAgNVwo1_L-iZniYRtfhpumKIg7Y	5	0	1	0	0	0	1	0	0	需要进一步考虑	5	杨明	13941980604	广东省-湛江市-霞山区	15-20万
2017-10-12 18:57:15	175.*.*.233	205	a006991	owkvfskkbw6KAhP6b8av7Luhso0o	oAgNVwpJ0_SfJ3Nb1Zqk_icLehKk	5	1	0	1	0	0	0	1	0	需要进一步考虑	5	王立新	13904005645	内蒙古自治区-乌兰察布市	15-20万
2017-10-12 18:54:52	123.*.*.104	70	a006991	owkvfsqWcTPsRWsjjNotpKY6PDo4	oAgNVwnJC6pFozWi0fLEPkIQ3GsM	5	1	1	1	0	1	1	0	0	不会	5	阿汤哥	13390323969	辽宁省-大连市-旅顺口区	
2017-10-12 18:54:09	14.*.*.112	52	a010667	owkvfsizsAeyhLyiLfYxEMlvxTXo	oAgNVwmPPKYe-VQYtqkVeddLdUSY	5	0	1	0	0	0	1	0	0	需要进一步考虑	5	杨凤凰	13421871974	广东省-湛江市	15-20万
2017-10-12 18:53:39	117.*.*.56	99	a010558	owkvfsg7uUh5dDGLE1fK_uU84GQY	oAgNVwnDKZ2fH-zZ567KNf7i7ai8	5	1	1	1	0	1	0	1	0	需要进一步考虑	5	王斌	15166312859	山东省-威海市-荣成市	10-15万
2017-10-12 18:52:52	42.*.*.255	75	a006991	owkvfsgXTgNMZCGOapYDk00IEPlE	oAgNVwjZL2EEXqkMw9yTgqS-0Ne0	5	1	1	1	1	1	1	1	1	当然会	5	刘万鑫	18941132051	辽宁省-沈阳市	25万以上
2017-10-12 18:51:47	223.*.*.152	67	a010393	owkvfsiSr7o-K3EoBnX-EWNVuLbQ	oAgNVwhWDDJhOhZxIXMgHg6sbhEo	5	0	1	0	0	0	0	1	0	当然会	5	王经理	13795118484	辽宁省-大连市-甘井子区	15-20万
2017-10-12 18:51:32	175.*.*.210	92	a010393	owkvfsspkLTMa9dI5X0D9WipfD9k	oAgNVwqm9iQpxb6N3W2OJ6-PEXMY	5	0	0	1	0	0	1	0	0	需要进一步考虑	5	周振山	18642623732	辽宁省-大连市-甘井子区	10-15万
2017-10-12 18:51:10	175.*.*.210	70	a010393	owkvfsgcXFQCFas2O8UYFyCZNkV8	oAgNVwvW9NQr_88dsDNIuXkSFwrI	5	1	1	1	1	1	1	1	1	当然会	5	辛奇	15140438023	辽宁省-大连市-甘井子区	10-15万
2017-10-12 18:50:53	14.*.*.112	45	a010667	owkvfsjvgfc_tdutZJxKXrRiWkbE	oAgNVwg4X70SFSBLmKrWmbcu8xCE	5	0	1	0	0	0	0	0	1	需要进一步考虑	5	陈峰	18478283618	广东省-湛江市	10-15万
2017-10-12 18:48:56	61.*.*.118	174	a010667	owkvfsiKGeB7va-dQAlwtq23l1bM	oAgNVwomaG6Jhi8BXejwSYMNR0W4	4	1	1	0	0	1	0	0	0	需要进一步考虑	5	王路	15945414351	黑龙江省-佳木斯市-桦川县	10-15万
2017-10-12 18:48:19	14.*.*.112	40	a010667	owkvfspF7rSrZE3eRvB5mwIMQQRg	oAgNVwgg8_WesnOtCz49o2wC75Ic	5	1	0	0	0	0	1	0	0	不会	5	陈颖	17194938355	广东省-湛江市	
2017-10-12 18:48:17	116.*.*.165	46	a006972	owkvfsr4ynx9A8JgmC4ecemc52LM	oAgNVwtGmrKz6SwtWAVEr9x5-luc	5	0	1	1	0	0	0	1	1	需要进一步考虑	5	胡子	13216932347	辽宁省-大连市-西岗区	25万以上
2017-10-12 18:45:48	14.*.*.112	38	a010667	owkvfsijO4C9tDpHXqbCzhITjD1k	oAgNVwjWiPdWvF9wxDlkAXRxMDxs	5	0	1	0	0	0	1	0	0	需要进一步考虑	5	杨桃	17185249837	广东省-湛江市	15-20万`;


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
  };
});

const urlTpl = 'https://editor.cform.io/plugin/da_tong_01.html?scenseId=${key}&openId=${openId}&unionId=${unionId}&answerTime=${time}&answer1=${mark_1}&answer2=${select_1}&answer3=${select_2}&answer4=${select_3}&answer5=${select_4}&answer6=${mark_2}&answer7=${mix}';


const urlList = dataList.map(data => {
  let url = urlTpl;
  Object.keys(data).forEach(key => {
    url = url.replace('${' + key + '}', encodeURIComponent(data[key]));
  });
  return url;
});

const listHtml = urlList.reduce((html, url, index) => {
  return html + `<li><a href="${url}">${dataList[index].mix}  ${dataList[index].key}</a></li>`;
}, '');

const html = `<ul>${listHtml}</ul>`;
$(document.body).append(html);


