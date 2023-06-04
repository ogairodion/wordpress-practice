"use strict";

import {
  paths,isDevelopment
} from "../../gulpfile.babel";
import webpack from "webpack";
import webpackStream from "webpack-stream";
import gulp from "gulp";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import browsersync from "browser-sync";
import debug from "gulp-debug";
import yargs from "yargs";

const argv = yargs.argv,
    production = !!argv.production;

const webpackConfig = require("../../webpack.config.js");


gulp.task("scripts", () => {
  return gulp.src(paths.scripts.src)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulpif(!isDevelopment || production, rename({
      suffix: ".min"
    })))
    .pipe(gulp.dest(paths.scripts.dist))
    .pipe(debug({
      "title": "JS files"
    }))
    .on("end", browsersync.reload);
});
