const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');

function compileCSS() {
    return gulp.src(['./src/scss/base/_base.scss',
                    './src/scss/pages/*.scss'])
                .pipe(sass().on('error', sass.logError))
                .pipe(concat('app.css'))
                .pipe(gulp.dest('./dist'));
}

function compileJS() {
    return gulp.src(['./src/js/*.js'])
                .pipe(concat('app.js'))
                .pipe(gulp.dest('./dist'));
}

function copyAssets() {
    return gulp.src(['./src/images/*'],
                    { base: './src/' })
                .pipe(gulp.dest('./dist'));
}

function copyViews() {
    return gulp.src(['./src/index.html'],
                    { base: './src/' })
                .pipe(gulp.dest('./dist'));
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch(["./src/scss/base/*.scss",
                "./src/scss/components/*.scss",
                "./src/scss/pages/*.scss"], gulp.series(compileCSS));

    gulp.watch(["./src/js/*.js"], gulp.series(compileJS));
    gulp.watch(["./src/index.html"], gulp.series(copyViews));

    gulp.watch(['./dist/app.css',
                './dist/app.js',
                './dist/index.html']).on('change', browserSync.reload);
}

exports.watch = gulp.series(gulp.parallel(compileCSS, compileJS, copyViews, copyAssets), serve);