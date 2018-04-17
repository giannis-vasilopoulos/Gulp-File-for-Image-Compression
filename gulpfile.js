var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); //https://www.npmjs.com/package/gulp-imagemin
var cache = require('gulp-cache'); //https://www.npmjs.com/package/gulp-cache
var runSequence = require('run-sequence'); //https://www.npmjs.com/package/run-sequence
var del = require('del'); //https://www.npmjs.com/package/del


gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
      .pipe(cache(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ])))
    .pipe(gulp.dest('dist/images'))
  });

  gulp.task('clean:dist', function() {
    return del.sync('dist/images/**/*');
  })

  gulp.task('clean:src', function() {
    return del.sync('app/images/**/*');
  })

  gulp.task('default', function (callback) {
    runSequence('clean:dist', 
      ['images'],// if we want tasks parallel
      'clean:src',
      callback
    )
  })