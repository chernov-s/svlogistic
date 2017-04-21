'use strict';

var autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    gulp            = require('gulp'),
    imagemin        = require('gulp-imagemin'),
    jade            = require('gulp-jade'),
    plumber         = require('gulp-plumber'),
    sourcemaps      = require('gulp-sourcemaps'),
    watch           = require('gulp-watch'),
    gutil           = require('gulp-util'),
    rename          = require('gulp-rename'),
    minifyCss       = require('gulp-minify-css'),
    include         = require('gulp-include'),
    uglify          = require('gulp-uglify'),
    rimraf          = require('rimraf'),
    seq             = require('run-sequence'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    spritesmith     = require('gulp.spritesmith');

/* ==========================================================================
 Variables
 ========================================================================== */

var modules = 'node_modules/',
    vendor = 'src/vendor/';

var paths = {
    jade: 'src/**/*.jade',
    jadePages: 'src/*.jade',
    sass: 'src/sass/**/*.scss',
    fonts: 'src/fonts/*',
    js: 'src/js/**/*.js',
    jsApp: 'src/js/app.js',
    img: 'src/img/**/*',
    sprite: 'src/sprite/*.*',
    libs: {
        js: [
            modules + 'jquery/dist/jquery.min.js',
            //modules + 'bootstrap/dist/js/bootstrap.js',
            //modules + 'jquery.nicescroll/jquery.nicescroll.min.js',
            vendor + 'jquery.ascensor.min.js',
            vendor + 'jquery.mousewheel.min.js',
            vendor + 'slick.min.js',
            modules + 'fullpage.js/dist/jquery.fullpage.min.js',
            modules + 'slick-carousel/slick/slick.min.js',
            //modules + 'fullpage.js/dist/jquery.fullpage.extensions.min.js'
        ],
        css: []
    }
};

/* ==========================================================================
 Error handler
 ========================================================================== */

var onError = function (err) {
    var errorLine = (err.line) ? 'Line ' + err.line : '',
        errorTitle = (err.plugin) ? 'Error: [ ' + err.plugin + ' ]' : 'Error';

    gutil.beep();
    gutil.log(gutil.colors.red('\n' + errorTitle + 'line: ' + errorLine + '\n\n', err.message));
    this.emit('end');
};

/* ==========================================================================
 Tasks
 ========================================================================== */

gulp.task('default', function (cb) {
    seq('watch', 'server', cb);
});

gulp.task('build', function (cb) {
    seq('clean', ['html', 'sass', 'fonts', 'js', 'img', 'sprite', 'css:libs', 'js:libs'], cb);
});

gulp.task('watch', ['build'], function () {
    watch(paths.jade, function () {
        seq('html');
    });
    watch(paths.sass, function () {
        seq('sass');
    });
    watch(paths.fonts, function () {
        seq('fonts');
    });
    watch(paths.js, function () {
        seq('js');
    });
    watch(paths.img, function () {
        seq('img');
    });
});

gulp.task('clean', function (cb) {
    rimraf('dist', cb);
});

gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

gulp.task('html', function () {
    return gulp.src(paths.jadePages)
        .pipe(plumber({errorHandler: onError}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
    return gulp.src('src/sass/main.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(sourcemaps.init())
        .pipe(minifyCss({compatibility: 'ie8', keepBreaks: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
    return gulp.src(paths.jsApp)
        .pipe(include())
        .on('error', console.log)
        //.pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename('app.js'))
        .pipe(gulp.dest('dist/assets/js/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function () {
    return gulp.src(paths.img)
        .pipe(imagemin({
            optimizationLevel: 2,
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sprite', function() {
    var spriteData =
        gulp.src(paths.sprite) // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                padding: 2,
                cssName: 'sprite.scss',
                cssFormat: 'scss',
                imgPath: '../img/sprite.png',
            }));

    spriteData.img.pipe(gulp.dest('dist/assets/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('src/sass/helpers/')); // путь, куда сохраняем стили
});

/* ==========================================================================
 Tasks for production
 ========================================================================== */
gulp.task('sass:min', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(minifyCss({compatibility: 'ie8', keepBreaks: false}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js:min', function () {
    return gulp.src(paths.js)
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('dist/assets/js/'))
        .pipe(browserSync.reload({stream: true}));
});

/* ==========================================================================
 Tasks for libs
 ========================================================================== */
gulp.task('css:libs', function () {
    return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
        .pipe(sass())
        .pipe(minifyCss({keepBreaks: false}))
        .pipe(rename('core.min.css'))
        .pipe(gulp.dest('dist/assets/css/'));
});

gulp.task('js:libs', function () {
    return gulp.src(paths.libs.js)
        .pipe(concat('core.js'))
        .pipe(uglify())
        .pipe(rename('core.min.js'))
        .pipe(gulp.dest('dist/assets/js/'))
});