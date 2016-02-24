"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var rimraf = require("rimraf");

var config=  {
  paths: {
    src: "src",
    sass: "sass/**/*.sass"
  }
};

gulp.task("clean-css", (cb) => {
  rimraf("css", cb);
});

gulp.task("sass", ["clean-css"], (cb) => {
  return gulp.src(`${config.paths.src}/${config.paths.sass}`)
    .pipe(sass())
    .pipe(gulp.dest("css"));
});

gulp.task("watch", () => {
  var watcher = gulp.watch(config.paths.sass, {cwd: config.paths.src}, ["sass"]);
  watcher.on("change", (event) => {
    console.log(`File ${event.path} was ${event.type}.`);
  });
});

gulp.task("default", ["sass", "watch"]);
