const cmd = require('node-cmd');
const colors = require('colors');

module.exports = exports = function(projectName, answers) {
    console.log(colors.grey('\n------------------------\n'));
    console.log(colors.dim('Installing npm packages. Please wait.'));
    cmd.run(`cd ${projectName} && npm install`);
}