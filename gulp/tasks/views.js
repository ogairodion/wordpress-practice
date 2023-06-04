"use strict";

import {
    paths,isDevelopment
} from "../../gulpfile.babel";
import gulp from "gulp";
import plumber from "gulp-plumber";
import pug from "gulp-pug";
import gulpif from "gulp-if";
import replace from "gulp-replace";
import browsersync from "browser-sync";
import yargs from "yargs";

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("views", () => {
    return gulp.src(paths.views.src)
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulpif(!isDevelopment || production, replace(".css", ".min.css")))
        .pipe(gulpif(!isDevelopment || production, replace(/js\/([\da-zA-Z\.-]+)\.js/g, function (match) {
            console.log(match);
            return match.replace(".js", ".min.js");
        })))
        .pipe(gulp.dest(paths.views.dist))
        .pipe(browsersync.stream());
});