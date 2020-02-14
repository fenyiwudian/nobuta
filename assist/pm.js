const fs = require('fs');
const username = require('os').userInfo().username;
const codeDir = `/Users/${username}/code/`;
const jsonFile = `/Users/${username}/Library/Application Support/Code/User/globalStorage/alefragnani.project-manager/projects.json`;

const projects = fs.readdirSync(codeDir).filter(item => {
  const stat = fs.statSync(codeDir + '/' + item);
  return stat.isDirectory();
});

console.log(projects);

const configs = projects.map(item => {
  return {
    name: item,
    rootPath: codeDir + '/' + item,
    path: [],
    group: "",
    enabled: true
  };
});

fs.writeFileSync(jsonFile, JSON.stringify(configs, null, '  '));