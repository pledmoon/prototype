module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./src/pug/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./src/assets/styles/**/*.scss', $.gulp.series('styles:dev'));
        $.gulp.watch(['./src/assets/images/general/**/*.{png,jpg,gif}',
            './src/assets/images/content/**/*.{png,jpg,gif}'], $.gulp.series('img:dev'));
        $.gulp.watch('./src/assets/images/svg/*.svg', $.gulp.series('svg'));
        $.gulp.watch('./src/assets/js/**/*.js', $.gulp.series('js:dev'));
    });
};