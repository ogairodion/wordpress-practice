"use strict";

import {
  paths,isDevelopment
} from "../../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import imageminWebp from "imagemin-webp";
import webp from "gulp-webp";
import debug from "gulp-debug";
import browsersync from "browser-sync";

gulp.task("webp", () => {
  return gulp.src(paths.webp.src)
    .pipe(webp(gulpif(!isDevelopment, imageminWebp({
      lossless: true,
      quality: 100,
      alphaQuality: 100
    }))))
    .pipe(gulp.dest(paths.webp.dist))
    .pipe(debug({
      "title": "Images"
    }))
    .on("end", browsersync.reload);
});
