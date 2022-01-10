const gulp = require("gulp");

const {transpileScripts} = require("./gulpfile.transpile");
const {uploadScripts} = require("./gulpfile.upload");
const {pingGameServer} = require("./gulpfile.ping");
const {watchScripts} = require("./gulpfile.watch");

gulp.task("transpile", transpileScripts);
gulp.task("upload", uploadScripts);
gulp.task("ping", pingGameServer);
gulp.task("watch", watchScripts);
