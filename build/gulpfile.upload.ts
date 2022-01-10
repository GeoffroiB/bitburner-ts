const glob = require("glob");
const ts = require("gulp-typescript");
const path = require("path");

const {ServerDAO} = require("./dao");

export async function uploadScripts() {
    const proj = ts.createProject(path.resolve("scripts/tsconfig.json"));

    const dao = new ServerDAO();
    dao.init();

    const pattern = "**/*.js";
    const dir = path.resolve("./scripts/dist");

    const matches = glob.sync(pattern, {mark: true, root: dir, cwd: dir});
    console.log(matches);

    for (let f of matches){
        await dao.upload(f);
    }
}
