/** @param {NS} ns **/
export async function getServersList(ns: NS): Promise<string[]> {
    let checked_servers: string[] = [];
    let unchecked_servers: string[] = ["home"];

    while (!!unchecked_servers.length) {
        await ns.sleep(1);

        const s: string | undefined = unchecked_servers.shift();
        if (!s || checked_servers.includes(s)) {
            continue;
        }

        for (let s2 of ns.scan(s)) {
            if (checked_servers.includes(s2) || unchecked_servers.includes(s2)) {
                continue;
            }
            unchecked_servers.push(s2);
        }

        checked_servers.push(s);
    }

    return checked_servers;
}
