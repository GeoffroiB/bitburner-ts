/** @param {NS} ns **/
export async function main(ns: NS) {
    if (ns.args.length < 3) {
        ns.tprint("ERROR [host target], [thread count] and [affects stocks?] must be supplied in args.");
        ns.exit();
    }
    await ns.grow(
        ns.args[0] as string,
        {
            threads: ns.args[1] as number,
            stock: ns.args[2] as boolean
        });
}
