var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var ngAnnotate = require('gulp-ng-annotate');
// var ngHtml2Js = require('gulp-ng-html2js');// ng模板合并压缩成js
var htmlmin = require('gulp-htmlmin');
//----------------------------------------------------
var tinypng = require('gulp-tinypng-compress');//图片压缩
//-----------------------------------------------------
var order = require("gulp-order");
gulp.task('minifyJs', function () {
    return gulp.src('js/**/*.js')      // 需要操作的文件
        .pipe(order([
            "app.js",
            "config.js",
            "controllers.js"
        ]))
        .pipe(concat('myionic.js')) // 合并需要操作的文件为一个文件myionic.js
        .pipe(gulp.dest('dist')) // 输出myionic.js到www/dist目录
        .pipe(rename('myionic.min.js')) // 文件重命名为myionic.min.js
        .pipe(ngAnnotate())
        .pipe(ngmin({dynamic: false}))//Pre-minify AngularJS apps with ngmin
        .pipe(stripDebug())//除去js代码中的console和debugger输出
        .pipe(uglify({compress: true})) // 压缩
        .pipe(gulp.dest('dist')); // 输出
});
gulp.task('minifyCss', function () {
    return gulp.src("css/*.css")
        .pipe(concat('myionic.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest("dist"));
});
gulp.task('html2js', function() {
    return gulp.src('templates/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('watch', function () {
    gulp.watch('templates/**/*.html', ['html2js']);
    gulp.watch('css/*.css', ['minifyCss']);
    gulp.watch('js/**/*.js', ['minifyJs']);
});


gulp.task('default', ['html2js', 'minifyCss','minifyJs']);

gulp.task("tinypng", function(){
    gulp.src('img/*.{png,jpg,gif,ico}')
        .pipe(tinypng({
            key: 'YOUR_KEY',
            sigFile: 'images/.tinypng-sigs',
            log: true
        })).on('error', function(err) {
        console.error(err.message);
    })
        .pipe(gulp.dest('dist/img'));
});