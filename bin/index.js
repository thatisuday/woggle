#!/usr/bin/env node

const program = require('commander');
const colors = require('colors');
const path = require('path');
const pathExists = require('path-exists');
const generate = require('../src/commands/generate');

// set version
const VERSION = require('../package.json').version;
program.version(VERSION);

// create new project
program
    .command('generate <projectName>')
    .alias('g')
    .description('Create new woggle project.')
    .action(function (projectName) {
        // check if project folder already exists
        if(pathExists.sync(path.resolve(process.cwd(), projectName))){
            console.log(colors.yellow.bold(`Error! Directory ${projectName} already exist.`));
            process.exit(1);
        }
        else{
            generate(projectName);
        }
    });


/*****************************************/

// allow commander to parse `process.argv`
program.parse(process.argv);

/*****************************************/

// unsupported command
if (process.argv.length < 3) {
    program.help(function(helpInfo) {
        return colors.yellow(helpInfo);
    });
};