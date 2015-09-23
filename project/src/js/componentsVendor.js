var gulp    = require('gulp'),
    connect = require('gulp-connect');

gulp.task('html', function(){
    gulp.src('src/*.html')
        .pipe(connect.reload())
});



gulp.task('jsComponent', function(){
    gulp.src('./src/js/../../*.js')
        .pipe(connect.reload())
});

gulp.task('htmlComponent', function(){
    gulp.src('./src/js/../*.html')
      .pipe(connect.reload())
});



gulp.task('connect', function () {
    connect.server({
        root: '',
        port: 8000,
        livereload: true
    });
});

gulp.task('watch', function () {

    gulp.watch(['./src/*.html'], ['html']);
    gulp.watch(['./src/**/**/*.js'], ['jsComponent']);
    gulp.watch(['./src/**/*.html'], ['htmlComponent']);

});

gulp.task('default',['connect', 'watch']);