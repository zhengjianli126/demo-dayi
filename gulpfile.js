var gulp = require('gulp');
var uglify = require('gulp-uglify');
gulp.task('default', function() {
  return gulp.src('src/js/*.json') //压缩的文件
    .pipe(uglify())
    .pipe(gulp.dest('dist/js')) //输出文件夹
});
