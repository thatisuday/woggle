const gulp = require('gulp');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

const ts = require('gulp-typescript').createProject('tsconfig.json');

// compile pug
gulp.task('compile:pug', function () {
    var locals = require('./locals.pug.json');

    return gulp.src('./src/pug/**/*.pug')
        .pipe(pug({
            locals: locals,
            pretty: true
        }))
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('./build'))
        ;
});

// compile html
gulp.task('compile:html', function () {
    return gulp.src('./src/html/**/*.html')
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('./build'))
        ;
});

// compile scss
gulp.task('compile:scss:all', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({ dirname: 'css' }))
        .pipe(gulp.dest('./build'))

        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'))
        ;
});
gulp.task('compile:scss:combine', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('build.css'))
        .pipe(gulp.dest('./build/css'))

        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(concat('build.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/css'))
        ;
});
gulp.task('compile:scss', function (cb) {
    runSequence('compile:scss:all', 'compile:scss:combine', cb);
});

// compile css
gulp.task('compile:css:all', function () {
    return gulp.src('./src/css/**/*.css')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({ dirname: 'css' }))
        .pipe(gulp.dest('./build'))

        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'))
        ;
});
gulp.task('compile:css:combine', function () {
    return gulp.src('./src/css/**/*.css')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('build.css'))
        .pipe(gulp.dest('./build/css'))

        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(concat('build.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/css'))
        ;
});
gulp.task('compile:css', function (cb) {
    runSequence('compile:css:all', 'compile:css:combine', cb);
});

// compile typescript
gulp.task('compile:ts:all', function () {
    var tsResult = gulp.src('./src/ts/**/*.ts').pipe(ts());

    return tsResult.js
        .pipe(rename({ dirname: 'js' }))
        .pipe(gulp.dest('./build'))

        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'))
        ;
});
gulp.task('compile:ts:combine', function () {
    var tsResult = gulp.src('./src/ts/**/*.ts').pipe(ts());

    return tsResult.js
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./build/js'))

        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('build.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/js'))
        ;
});
gulp.task('compile:ts', function (cb) {
    runSequence('compile:ts:all', 'compile:ts:combine', cb);
});

// compile JavaScript
gulp.task('compile:js:all', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(rename({ dirname: 'js' }))
        .pipe(gulp.dest('./build'))

        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'))
        ;
});
gulp.task('compile:js:combine', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./build/js'))

        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('build.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/js'))
        ;
});
gulp.task('compile:js', function (cb) {
    runSequence('compile:js:all', 'compile:js:combine', cb);
});

// copy assets file
gulp.task('copy:assets', function () {
    gulp
        .src(['./src/assets/**/*'])
        .pipe(gulp.dest('./build/assets'));
});

// browserSync task to launch preview server
gulp.task('browserSync', function () {
    return browserSync.init({
        reloadDelay: 2000, // reload after 2s, compilation is finished (hopefully)
        server: { baseDir: './build' }
    });
});

// task to reload browserSync
gulp.task('reloadBrowserSync', function () {
    return browserSync.reload();
});


/*********************************************/

// build
gulp.task('build', ['compile:pug', 'compile:scss', 'compile:ts', 'compile:html', 'compile:css', 'compile:js', 'copy:assets']);

// watch
gulp.task('watch', ['build', 'browserSync'], function () {
    gulp.watch(['./src/**/*'], ['build', 'reloadBrowserSync']);
});