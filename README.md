# woggle
A simple command line tool to generate **pug**, **sass**, **gulp** and **browser-sync** based front-end projects.

[![npm](https://img.shields.io/npm/dt/woggle.svg?style=flat-square)](https://www.npmjs.com/package/woggle)
[![npm](https://img.shields.io/npm/v/woggle.svg?style=flat-square)](https://www.npmjs.com/package/woggle)
[![David](https://img.shields.io/david/thatisuday/woggle.svg?style=flat-square)](https://www.npmjs.com/package/woggle)

## Install
```
npm install -g woggle
```

> This is a CLI module. Hence install it globally only. It will give you `wobble` command in terminal.

## Use
```
woggle generate my-project
woggle g my-project
```

**wobble** will generate a complete folder structure based on your choices. It will also install all npm dependencies and initialize gulpfile.js task file.

You can the use following commands to compile your project.

```
npm run build
npm run build:watch
```

This will put all compiled files inside `build` directory.

### Help
```
$ woggle --help

Usage: index [options] [command]

  Options:

    -V, --version             output the version number
    -h, --help                output usage information

  Commands:

    generate|g <projectName>  Create new woggle project.
```
