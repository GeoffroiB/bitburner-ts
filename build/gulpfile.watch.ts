const gulp = require("gulp");
const ts = require("gulp-typescript");
const path = require("path");
const watch = require("gulp-watch");

const transpileScripts = require("./gulpfile.transpile").transpileScripts;
const uploadScripts = require("./gulpfile.upload").uploadScripts;

export function watchScripts() {
    const proj = ts.createProject(path.resolve("src/tsconfig.json"));
    return watch("src/**/*.ts", function() {
        transpileScripts().then(uploadScripts());
    });
}
