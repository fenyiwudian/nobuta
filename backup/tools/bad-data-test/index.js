const fakeReq = require('./request');
const fs = require('fs');

const file = process.argv[2];

const getFlowId = () => {
  return fakeReq.post({
    host: '192.168.0.128',
    port: 3000,
    path: '/api/v1/flows'
  }).then(res => {
    return JSON.parse(res).id;
  });
};

const validate = (data, flowId) => {
  return fakeReq.post({
    host: '192.168.0.128',
    port: 3000,
    path: `/api/v1/flows/${flowId}/validate_anwsers`
  }, data).then(res => {
    return JSON.parse(res).result;
  });
};

const submit = (data, flowId) => {
  return fakeReq.post({
    host: '192.168.0.128',
    port: 3000,
    path: `/api/v1/flows/${flowId}/submit_validate_anwsers`
  }, data);
};

const azToNumber = (str) => {
  const chars = str.toUpperCase().split('');
  let result = 0;
  for (let i = chars.length - 1; i >= 0; i--) {
    let j = i;
    const char = chars[i];
    let base = char.charCodeAt() - 64;
    while (j < chars.length - 1) {
      j++;
      base *= 26;
    }
    result += base;
  }
  return result - 1;
};


const reduceValue = (chars, row) => {
  return chars.reduce((rs, char) => {
    const num = azToNumber(char);
    let value = row[num];
    if (!value && value !== 0) {
      value = '';
    } else {
      value = String(value);
    }
    if (value) {
      if (rs) {
        rs += ',';
      }
      rs += value;
    }
    return rs;
  }, '');
};

let currentIndex = 3;
let rowCount = 0;
let rows = null;


const writeFile = () => {
  const str = rows.reduce((rs, row) => {
    if (rs) {
      rs += '\n';
    }
    rs += row.join(',');
    return rs;
  });

  fs.writeFileSync(`./local-data/${file}-mark.csv`, str);

  console.log('file generated');
};

const postNext = () => {
  setTimeout(postOne);
};

const postOne = () => {
  const row = rows[currentIndex];
  const age = reduceValue(['au'], row);
  const locate = reduceValue(['av'], row);
  const car_brand = reduceValue(['ACE', 'BK'], row);
  const car_type = reduceValue(['ACF'], row);
  const six = reduceValue(['ex', 'ey', 'ez', 'fa', 'fb', 'fc'], row);
  const three_1 = reduceValue(['fe', 'ff', 'fg'], row);
  const three_2 = reduceValue(['fh', 'fi', 'fj'], row);
  const three_3 = reduceValue(['fk', 'fl', 'fm'], row);

  getFlowId().then(flowId => {
    console.log('count: ', currentIndex);
    const data = {
      age, locate, car_brand, car_type, six, three_1, three_2, three_3,
      survey_id: '5d91177a-2d70-4dc5-bc47-222222222222'
    };
    validate(data, flowId).then(valid => {
      currentIndex++;
      if (!valid) {
        console.log('invalid, mark.');
        row.unshift('XXXXX');
        if (currentIndex >= rowCount) {
          console.log('completed', currentIndex);
          writeFile();
        } else {
          postNext();
        }
      } else {
        console.log('valid, submit');
        row.unshift('');
        submit(data, flowId).then(() => {
          if (currentIndex >= rowCount) {
            console.log('completed', currentIndex);
            writeFile();
          } else {
            postNext();
          }
        });
      }
    });
  });
};


const doWithPlain = () => {
  let data = fs.readFileSync(`./local-data/${file}.csv`).toString();
  let first = true;
  // 清除无效的用户输入的\n
  data = data.replace(/\n(?!\w{8}(?:-\w{4}){3}-\w{12})/g, function () {
    if (first) {
      first = false;
      return arguments[0];
    } else {
      [].pop.call(arguments);
      console.log(arguments);
      return '';
    }
  });

  rows = data.split('\n').map(line => {
    return line.split(',');
  });
  rowCount = rows.length;

  console.log(rowCount);

  postOne();
};

doWithPlain();

