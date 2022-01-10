import {getServersList} from "utils/servers";

/** @param {NS} ns **/
export async function main(ns: NS) {
    while (true) {
        const servers = await getServersList(ns);
        for (const server of servers) {
            // ..
        }
    }
}
