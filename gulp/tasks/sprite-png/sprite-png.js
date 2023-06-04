import {
    paths
} from "../../../gulpfile.babel";
import gulp from "gulp";
import plumber from "gulp-plumber";
import spritesmith from "gulp.spritesmith";
import buffer from "vinyl-buffer";
import imagemin from "gulp-imagemin";
import config from "../../config";

gulp.task("sprite:png", async function () {
    var spriteData = gulp.src(paths.views.iconsPng + "/*.png")
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(spritesmith({
            imgName: "sprite.png",
            cssName: "_sprite-png.scss",
            imgPath: "../img/sprite.png",
            retinaSrcFilter: paths.views.iconsPng + "/*@2x.png",
            retinaImgName: "sprite@2x.png",
            retinaImgPath: "../img/sprite@2x.png",
            padding: 10,
            algorithm: "binary-tree",
            cssTemplate: __dirname + "/sprite.template.mustache"
        }));
    spriteData.img
        .pipe(buffer())
        .pipe(imagemin({
            optimizationLevel: 3
        }))
        .pipe(gulp.dest(paths.images.dist));
    spriteData.css
        .pipe(gulp.dest(paths.views.sassGen));
});

gulp.task("sprite:png:watch", async function () {
    gulp.watch(paths.views.iconsPng + "/*.png", gulp.series("sprite:png"));
});
