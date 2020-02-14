let uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    scriptsPATH = {
        "input": "./src/assets/js/",
        "ouput": "./dist/assets/js/"
    };

module.exports = function () {
    $.gulp.task('libsJS:dev', () => {
        return $.gulp.src([
                'node_modules/svg4everybody/dist/svg4everybody.min.js',
                'node_modules/swiper/js/swiper.min.js',
                'node_modules/lightgallery.js/dist/js/lightgallery.min.js',
                'node_modules/choices.js/public/assets/scripts/choices.min.js',
                'node_modules/nouislider/distribute/nouislider.min.js',
                'node_modules/drift-zoom/dist/Drift.min.js',
                'node_modules/simplebar/dist/simplebar.min.js'
            ])
            .pipe(concat('libs.min.js'))
            .pipe($.gulp.dest(scriptsPATH.ouput));
    });

    $.gulp.task('libsJS:build', () => {
        return $.gulp.src([
                'node_modules/svg4everybody/dist/svg4everybody.min.js',
                'node_modules/swiper/js/swiper.min.js',
                'node_modules/lightgallery.js/dist/js/lightgallery.min.js',
                'node_modules/choices.js/public/assets/scripts/choices.min.js',
                'node_modules/nouislider/distribute/nouislider.min.js',
                'node_modules/drift-zoom/dist/Drift.min.js',
                'node_modules/simplebar/dist/simplebar.min.js'
            ])
            /*.pipe(babel({
                presets: ['@babel/env']
            }))*/
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe($.gulp.dest(scriptsPATH.ouput));
    });

    $.gulp.task('js:dev', () => {
        return $.gulp.src([scriptsPATH.input + '*.js',
            '!' + scriptsPATH.input + 'libs.min.js'])
            .pipe($.gulp.dest(scriptsPATH.ouput))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });

    $.gulp.task('js:build', () => {
        return $.gulp.src([scriptsPATH.input + '*.js',
            '!' + scriptsPATH.input + 'libs.min.js'])
            .pipe($.gulp.dest(scriptsPATH.ouput))
    });

    $.gulp.task('js:build-min', () => {
        return $.gulp.src([scriptsPATH.input + '*.js',
            '!' + scriptsPATH.input + 'libs.min.js'])
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(concat('main.js'))
            .pipe(uglify())
            .pipe($.gulp.dest(scriptsPATH.ouput))
    });
};
