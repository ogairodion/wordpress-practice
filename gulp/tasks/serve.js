"use strict";

import {
    paths
} from "../../gulpfile.babel";
import gulp from "gulp";
import browsersync from "browser-sync";

gulp.task("serve", () => {
    browsersync.init({
        server: "./dist/",
        port: 4000,
        notify: false
    });

    gulp.watch(paths.views.watch, gulp.parallel("views"));
    gulp.watch(paths.styles.watch, gulp.parallel("styles"));
    gulp.watch(paths.scripts.watch, gulp.parallel("scripts"));

    gulp.watch(paths.views.iconsPng + "/*.png", gulp.parallel("sprite:png"));
    gulp.watch(paths.views.iconsSvgMono + "/*.svg", gulp.parallel("sprite:svg")
    );
    gulp.watch(paths.views.iconsSvgColor + "/*.svg", gulp.parallel("sprite:svg"));

    gulp.watch(paths.images.watch, gulp.parallel("images"));
    gulp.watch(paths.webp.watch, gulp.parallel("webp"));
    gulp.watch(paths.fonts.watch, gulp.parallel("fonts"));
    gulp.watch(paths.json.watch, gulp.parallel("json"));
    gulp.watch(paths.pdf.watch, gulp.parallel("pdf"));
    gulp.watch(paths.php.watch, gulp.parallel("php"));
    gulp.watch(paths.videos.watch, gulp.parallel("videos")); 
    gulp.watch(paths.views.pagelist, gulp.parallel("list-pages"));
});
