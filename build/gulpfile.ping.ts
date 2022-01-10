const glob = require("glob");
const ts = require("gulp-typescript");
const path = require("path");

const {ServerDAO} = require("./dao");

export async function pingGameServer() {
    const dao = new ServerDAO();
    const result = await dao.ping();
    console.log(result);
}
