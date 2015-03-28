var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    jsdoc = require("gulp-jsdoc"),
    jsdoc2md = require("gulp-jsdoc-to-markdown");


gulp.task('compress', function () {
    gulp.src('./lib.js')
        .pipe(uglify())
        .pipe(rename("lib.min.js"))
        .pipe(gulp.dest('./'))
});

gulp.task('lint', function () {
    return gulp.src('./lib.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('docs', function () {
    gulp.src("./lib.js")
        .pipe(jsdoc('./docs'));
    gulp.src("./lib.js")
        .pipe(jsdoc2md())
        .pipe(rename(function(path){
            path.extname = ".md";
        }))
        .pipe(gulp.dest("docs"));
});

gulp.task('default', ['lint', 'compress', 'docs']);