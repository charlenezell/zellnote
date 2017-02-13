import gulp from 'gulp';
// import gutil from 'gulp-util';
// import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
// import rename from "gulp-rename";
import browserify from "browserify";


// import livereload from "gulp-livereload";
import source from "vinyl-source-stream";
import buffer from "vinyl-buffer";
import babelify from "babelify";
import deumdify from 'deumdify';
// import livereload from "gulp-livereload";

export function script() {
  var b = browserify({
      standalone: "jfu",
      entries: './main.es6',
      debug: false
    })
    .plugin(deumdify)
    .transform(babelify,{
      compact: "true"
    });
  return b.bundle()
    // .on('error', function(err) {
    //   gutil.log(
    //     gutil.colors.red("Browserify compile error:\n"),
    //     err.message
    //   );
    //   this.emit("end");
    // })
    .pipe(source('main.js'))
    .pipe(buffer())
    // .pipe(eslint())
    // .pipe(eslint.format())
    // .pipe(uglify())
    .pipe(gulp.dest("./"));
    // .pipe(livereload());
}

export function watch() {
  // livereload.listen();
  gulp.watch(["./main.es6","./demo/*.es6","./widget/*.es6"], script);
}

const build = gulp.series(script, watch);

export {
  build
};

export default build;