const gulp = require("gulp");

const {transpileScripts} = require("./gulpfile.transpile");
const {uploadScripts} = require("./gulpfile.upload");

gulp.task("transpile", transpileScripts);
gulp.task("upload", uploadScripts);
