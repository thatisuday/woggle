const path = require('path');
const cp = require('cp');
const replace = require('replace-in-file');

module.exports = exports = function (projectName, answers) {
    // copy package.json and replace package name
    cp.sync(path.resolve(__dirname, '../files/package.json'), projectName + '/package.json');
    replace.sync({
        files: path.resolve(projectName, 'package.json'),
        from: ['$__packageName'],
        to: projectName,
    });

    // copy gulpfile.js
    cp.sync(path.resolve(__dirname, '../files/gulpfile.js'), projectName + '/gulpfile.js');

    // copy .gitignore
    cp.sync(path.resolve(__dirname, '../files/gitignore.txt'), projectName + '/.gitignore');

    // copy tsconfig.json
    cp.sync(path.resolve(__dirname, '../files/tsconfig.json'), projectName + '/tsconfig.json');

    // copy locals.pug.json
    cp.sync(path.resolve(__dirname, '../files/locals.pug.json'), projectName + '/locals.pug.json');

    // scriptLang
    switch (answers.scriptLang) {
        case 'ts':
            cp.sync(path.resolve(__dirname, '../files/sample/main.ts'), projectName + '/src/ts/main.ts');
            break;
        default:
            cp.sync(path.resolve(__dirname, '../files/sample/main.js'), projectName + '/src/js/main.js');
    };

    // styleLang
    switch (answers.styleLang) {
        case 'scss':
            cp.sync(path.resolve(__dirname, '../files/sample/styles.scss'), projectName + '/src/scss/styles.scss');
            break;
        default:
            cp.sync(path.resolve(__dirname, '../files/sample/styles.css'), projectName + '/src/css/styles.css');
    };

    // htmlLang
    switch (answers.htmlLang) {
        case 'pug':
            cp.sync(path.resolve(__dirname, '../files/sample/index.pug'), projectName + '/src/pug/index.pug');
            break;
        default:
            cp.sync(path.resolve(__dirname, '../files/sample/index.html'), projectName + '/src/html/index.html');
    };

    // copy logo.jpg asset file
    cp.sync(path.resolve(__dirname, '../files/logo.jpg'), projectName + '/src/assets/logo.jpg');
};