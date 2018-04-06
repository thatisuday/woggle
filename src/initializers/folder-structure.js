const path = require('path');
const mkdirp = require('mkdirp');
const cp = require('cp');

function getDir(answers) {
    var dir = [
        'src',              // source directory
        'src/assets',       // assets directory
        'build',            // build directory
    ];

    // scriptLang
    switch (answers.scriptLang) {
        case 'ts':
            dir.push('src/ts');
            break;
        default:
            dir.push('src/js');
    };

    // styleLang
    switch (answers.styleLang) {
        case 'scss':
            dir.push('src/scss');
            break;
        default:
            dir.push('src/css');
    };

    // htmlLang
    switch (answers.htmlLang) {
        case 'pug':
            dir.push('src/pug');
            break;
        default:
            dir.push('src/html');
    };

    return dir;
};

module.exports = exports = function (projectName, answers) {
    // get selected directories
    var dir = getDir(answers);

    // create folder structure
    dir.forEach(function (path) {
        mkdirp.sync(projectName + '/' + path);
    });
};