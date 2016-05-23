"use strict";

var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
var cssnano = require("gulp-cssnano");
var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var rimraf = require("rimraf");

var config =  {
  paths: {
    js: "js/**/*.js",
    src: "src",
    sass: "sass/**/*.sass"
  }
};

gulp.task("clean-css", cb => {
  rimraf("css", cb);
});

gulp.task("sass", ["clean-css"], cb => {
  return gulp.src(`${config.paths.src}/${config.paths.sass}`)
    .pipe(sourcemaps.init())
      .pipe(sass({errLogToConsole: true}))
      .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("public/css"));
});

gulp.task("clean-js", cb => {
  rimraf("js", cb);
});

gulp.task("js", ["clean-js"], cb => {
return gulp.src(`${config.paths.src}/${config.paths.js}`)
  .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ["es2015"]
    }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest("public/js"));
});

gulp.task("watch", () => {
  var jsWatch = gulp.watch(config.paths.js, {cwd: config.paths.src}, ["js"]);
  jsWatch.on("change", (event) => {
    console.log(`File ${event.path} was ${event.type}.`);
  });


  var sassWatch = gulp.watch(config.paths.sass, {cwd: config.paths.src}, ["sass"]);
  sassWatch.on("change", (event) => {
    console.log(`File ${event.path} was ${event.type}.`);
  });
});

gulp.task("default", ["js", "sass", "watch"]);
