import {
    paths
} from "../../../gulpfile.babel";
import gulp from "gulp";
import plumber from "gulp-plumber";
import svgmin from "gulp-svgmin";
import svgStore from "gulp-svgstore";
import rename from "gulp-rename";
import cheerio from "cheerio";
import gCheerio from "gulp-cheerio";
import through2 from "through2";
import consolidate from "gulp-consolidate";

// monocolor icons controlled with color/fill in css
gulp.task("sprite:svg:mono", async function () {
    return gulp
        .src(paths.views.iconsSvgMono + "/**/*.svg")
        .pipe(plumber())
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeDesc: true
            }, {
                cleanupIDs: true
            }, {
                mergePaths: false
            }, {
                removeViewBox: false
            }]
        }))
        .pipe(rename({
            prefix: "ico-mono-"
        }))
        .pipe(svgStore({
            inlineSvg: false
        }))
        .pipe(through2.obj(function (file, _encoding, cb) {
            var $ = cheerio.load(file.contents.toString(), {
                xmlMode: true
            });
            var data = $("svg > symbol").map(function () {
                var $this = $(this);

                var size = $this.attr("viewBox").split(" ").splice(2);
                var name = $this.attr("id");
                var ratio = size[0] / size[1]; // symbol width / symbol height
                var fill = $this.find("[fill]:not([fill=\"currentColor\"])").attr("fill");
                var stroke = $this.find("[stroke]").attr("stroke");
                return {
                    name: name,
                    ratio: +ratio.toFixed(2),
                    fill: fill || "initial",
                    stroke: stroke || "initial"
                };
            }).get();
            this.push(file);
            gulp.src(__dirname + "/_sprite-svg-mono.scss")
                .pipe(consolidate("lodash", {
                    symbols: data
                }))
                .pipe(gulp.dest(paths.views.sassGen));
            cb();
        }))
        .pipe(gCheerio({
            run: function ($) {
                $("[fill]:not([fill=\"currentColor\"])").removeAttr("fill");
                $("[stroke]").removeAttr("stroke");
                $("[style]").removeAttr("style");
                $("[opacity]").removeAttr("opacity");
                $("[fill-opacity]").removeAttr("fill-opacity");
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(rename({
            basename: "sprite-mono"
        }))
        .pipe(gulp.dest(paths.images.dist));
});


// preserve colors on icons
gulp.task("sprite:svg:color", function () {
    return gulp
        .src(paths.views.iconsSvgColor + "/**/*.svg")
        .pipe(plumber())
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                removeDesc: true
            }, {
                cleanupIDs: true
            }, {
                mergePaths: false
            }, {
                removeDimensions: false
            }, {
                removeAttrs: false
            }, {
                removeViewBox: false
            }]
        }))
        .pipe(rename({
            prefix: "ico-color-"
        }))
        .pipe(svgStore({
            inlineSvg: false
        }))
        .pipe(through2.obj(function (file, encoding, cb) {
            var $ = cheerio.load(file.contents.toString(), {
                xmlMode: true
            });
            var data = $("svg > symbol").map(function () {
                var $this = $(this);
                var size = $this.attr("viewBox").split(" ").splice(2);
                var name = $this.attr("id");
                var ratio = size[0] / size[1]; // symbol width / symbol height
                return {
                    name: name,
                    ratio: +ratio.toFixed(2)
                };
            }).get();
            this.push(file);
            gulp.src(__dirname + "/_sprite-svg-color.scss")
                .pipe(consolidate("lodash", {
                    symbols: data
                }))
                .pipe(gulp.dest(paths.views.sassGen));
            cb();
        }))
        .pipe(rename({
            basename: "sprite-color"
        }))
        .pipe(gulp.dest(paths.images.dist));
});

gulp.task("sprite:svg", gulp.series("sprite:svg:mono", "sprite:svg:color"));
