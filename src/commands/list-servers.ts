import {getServersList} from "utils/servers";

/** @param {NS} ns **/
export async function main(ns: NS) {
    const host: string | any = ns.args[0];
    if (!(typeof host !== "string")) {
        ns.tprint(`ERROR Unexpected argument 0: ${ns.args[0]}`);
        ns.exit();
    }

    const servers = await getServersList(ns);
    ns.tprint(JSON.stringify(servers, null, 2));
}
