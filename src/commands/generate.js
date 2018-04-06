const inquirer = require('inquirer');
const cmd = require('node-cmd');
const colors = require('colors');

// initializers
const initGit = require('../initializers/git');
const initFolderStructure = require('../initializers/folder-structure');
const initFiles = require('../initializers/files');
const initNpmInstall = require('../initializers/npm-install');

const questions = [
    { type: 'list', name: 'scriptLang', message: 'JavaScript pre-processor?', choices: ['js', 'ts'] },
    { type: 'list', name: 'styleLang', message: 'CSS pre-processor?', choices: ['css', 'scss'] },
    { type: 'list', name: 'htmlLang', message: 'HTML pre-processor?', choices: ['html', 'pug'] },
    
    // git
    { type: 'confirm', name: 'initGit', message: 'Initialize github repo?', default: false },
    { type: 'input', name: 'githubUsername', message: 'Type your github username...', when: function(answers) {return answers.initGit}},
    { type: 'input', name: 'githubRepo', message: 'Type github repo name...', when: function(answers) {return answers.initGit}},
];

module.exports = exports = function (projectName) {
    // show generating message
    console.log('\nGenerating project', colors.bgCyan.white(` ${projectName} `));
    console.log(colors.grey('\n------------------------\n'));

    // prompt questions
    inquirer.prompt(questions)
    .then(function (answers) {
        // create project structure
        initFolderStructure(projectName, answers);

        // initialize git
        initGit(projectName, answers);

        // initialize files
        initFiles(projectName, answers);

        // install npm packages
        initNpmInstall(projectName, answers);
    })
    .catch(function (err) {
        console.log('[woggle] Something went wrong', err);
    });
};