var gulp = require("gulp");
var ts = require("gulp-typescript");
var merge = require("merge2");

var tsProject = ts.createProject("tsconfig.json");

gulp.task("build", function() {
  var rst = tsProject.src()
    .pipe(ts(tsProject));
  return merge([rst.dts.pipe(gulp.dest("./typings"), rst.js.pipe(gulp.dest("./dest")))]);
});
gulp.task("watch",["build"],function(){
  return gulp.watch("./src/*.ts",["build"]);
});
