const gulp = require("gulp");
const ts = require("gulp-typescript");
const path = require("path");

export function transpileScripts() {
    const proj = ts.createProject(path.resolve("scripts/tsconfig.json"));

    return proj.src()
        .pipe(proj())
        .js
        .pipe(gulp.dest(proj.options.outDir));
}
