var gulp=require("gulp");
var ts=require("gulp-typescript");
gulp.task("default",["watch"]);
gulp.task("watch",function(){
  return gulp.watch("*.ts",["build"])
})
gulp.task("build",function(){
  return gulp.src("*.ts").pipe(ts()).pipe(gulp.dest("."));
})
