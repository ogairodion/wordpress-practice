"use strict";

import {
    paths,
    isDevelopment
} from "../../../gulpfile.babel";

import gulp from "gulp";
import consolidate from "gulp-consolidate";
import browsersync from "browser-sync";
// eslint-disable-next-line no-unused-vars
import yaml from "require-yaml";
import yargs from "yargs";

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("list-pages", async function () {
    if (isDevelopment && !production) {
        console.log('index-page inited')
        delete require.cache[require.resolve("../../../" + paths.views.pagelist)];
        var pages = require("../../../" + paths.views.pagelist);
        return gulp
            .src(__dirname + "/index.html")
            .pipe(
                consolidate("lodash", {
                    pages: pages,
                })
            )
            .pipe(gulp.dest(paths.views.dist))
            .on("end", browsersync.reload);
    }
});