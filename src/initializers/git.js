const cmd = require('node-cmd');

module.exports = exports = function(projectName, answers){
    if(answers.initGit) {
        let originUrl = `https://github.com/${answers.githubUsername}/${answers.githubRepo}.git`;
        cmd.run(`cd ${projectName} && git init && git remote add origin ${originUrl}`);
    }
}