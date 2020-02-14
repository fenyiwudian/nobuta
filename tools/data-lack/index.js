const fs = require('fs');

const drillUAMaps = () => {
  const str = fs.readFileSync('../../local-data/all.txt').toString();
  const lines = str.split('\n');
  const uaMaps = lines.map(line => {
    const match = line.match(/\v1\/responses\/(.{36}) HTTP.+/);
  });
};

