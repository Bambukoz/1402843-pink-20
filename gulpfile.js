const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sync = require('browser-sync').create();
const sassGlob = require('gulp-sass-glob');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imageMin = require('gulp-imagemin');
const imageWebp = require('gulp-webp');
const svgStore = require('gulp-svgstore');
const del = require('del');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');

// Css

gulp.task('css', () => {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(sync.stream());
});

// Images

gulp.task('images', () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(imageMin([
      imageMin.optipng({
        optimizationLevel: 3
      }),
      imageMin.mozjpeg({
        progressive: true
      }),
      imageMin.svgo(),
    ]))
    .pipe(gulp.dest('source/img'))
});

// WebP

gulp.task('webp', () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(imageWebp({
      quality: 90
    }))
    .pipe(gulp.dest('source/img/webp'))
});

// Sprite

gulp.task('sprite', () => {
  return gulp.src('source/img/svg-sprite/**/*.svg')
    .pipe(svgStore())
    .pipe(rename('svg-sprite.svg'))
    .pipe(gulp.dest('source/img'));
});

// HTML

gulp.task('htmlmin', () => {
  return gulp.src('source/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'));
});

// JS

gulp.task('jsmin', () => {
  return gulp.src('source/js/**/*.js')
    .pipe(minify({
      ext: {
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest("build/js"));
});

// Copy

gulp.task('copy', () => {
  return gulp.src([
      'source/fonts/**/*.{woff,woff2}',
      'source/img/**',
    ], {
      base: 'source'
    })
    .pipe(gulp.dest('build'));
});

// Clean

gulp.task('clean', () => {
  return del('build');
});

// Server

gulp.task(`server`, () => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });

  // Watcher
  gulp.watch('source/sass/**/*.scss', gulp.series('css'));
  gulp.watch('source/*.html').on('change', sync.reload);
});

// Build & Start
gulp.task('build', gulp.series('clean', 'htmlmin', 'css', 'jsmin', 'copy'));
gulp.task('start', gulp.series('build', 'server'));
