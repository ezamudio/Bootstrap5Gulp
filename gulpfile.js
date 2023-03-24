const { watch, series, src, dest } = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

function compileJS() {
  return src(['./assets/js/**/*.js'])
    .pipe(babel({
      presets: ['@babel/preset-env']
  }))
    .pipe(uglify())
    .pipe(rename({ extname: '-build.min.js' }))
    .pipe(dest('./dist/assets/js/'))
}

function compileSCSS() {
    return src('./assets/sass/**/*.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer('last 2 versions'))
      .pipe(rename({ extname: '-build.min.css' }))
      .pipe(dest('./dist/assets/css/'));
  };

function watchFiles() {
  watch(['./assets/sass/*.scss', './assets/sass/**/*.scss'], compileSCSS);
  watch('./assets/js/*.js', compileJS);
}
  

exports.build = series(compileSCSS, compileJS );
exports.watch = watchFiles;