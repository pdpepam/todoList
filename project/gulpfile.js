var gulp    = require('gulp'),
    connect = require('gulp-connect');

gulp.task('html', function(){
    gulp.src('src/*.html')
        .pipe(connect.reload())
});

var oomponentVendor = "./src/js/**/";


/**
 * livereload for components
 * */

gulp.task('htmlComponent', function(){
    gulp.src(oomponentVendor + '*.html')
        .pipe(connect.reload())
});


gulp.task('jsComponent', function(){
    gulp.src(oomponentVendor + '*.js')
        .pipe(connect.reload())
});



gulp.task('cssComponent', function(){
    gulp.src(oomponentVendor + '/*.css')
        .pipe(connect.reload())
});

/**
 * init servers
 * */

gulp.task('connect', function () {
    connect.server({
        root: '',
        port: 8000,
        livereload: true
    });
});

var tasks = "./src/**/";
gulp.task('watch', function () {

    gulp.watch(['./src/*.html'], ['html']);

    gulp.watch(tasks +  ['*.js'],   ['jsComponent']);
    gulp.watch(tasks +  ['*.html'], ['htmlComponent']);
    gulp.watch(tasks +  ['*.css'],  ['cssComponent']);


});

gulp.task('default',['connect', 'watch']);