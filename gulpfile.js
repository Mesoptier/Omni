var gulp = require("gulp");
var to5 = require("gulp-6to5");
var del = require("del");

gulp.task("clean", function (done) {
  del(["lib-es5/**"], done);
});

gulp.task("build", ["clean"], function () {
  return gulp.src("lib/**/*.js")
    .pipe(to5())
    .pipe(gulp.dest("lib-es5"));
});