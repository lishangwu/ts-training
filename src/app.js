const fs = require('fs')
const path = require('path')
const isDirectory = fs.isDirectory

const result = [];

function findAllFiles(root) {
  const files = fs.readdirSync(root);
  files.forEach(name => {
    const file = path.resolve(root, name);
    if (fs.lstatSync(file).isDirectory()) {
      findAllFiles(file);
    } else {
      result.push({
        path: file,
        check: false,
        // content: fs.readFileSync(file)
      });
    }
  });
}

let res = findAllFiles('/Users/haoning/Github/ts-training')
console.log(result)