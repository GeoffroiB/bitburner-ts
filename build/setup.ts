// Transpile build scripts

const gulp = require("gulp");
const ts = require("gulp-typescript");
const path = require("path");

function setupBuildScripts() {
    const proj = ts.createProject(path.resolve("build/tsconfig.json"));

    return proj.src()
        .pipe(proj())
        .js
        .pipe(gulp.dest(proj.options.outDir));
}

setupBuildScripts();
