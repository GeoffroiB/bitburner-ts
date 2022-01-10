import path from "path";

const fetch = require("node-fetch");
const fs = require("fs");
const dotenv = require("ts-dotenv");

import { strict as assert } from 'assert';
// import { load } from 'ts-dotenv';

export enum RequestAction {
    CREATE,
    UPDATE,
    UPSERT,
    DELETE
}

export interface RequestParams {
    /*
 * As of Bitburner v1.3.0, RequestAction are ignored
 */
    action: RequestAction,
    filename: string,
    code: string
}

export class ServerDAO {
    private auth_token: string | undefined;
    private port: number | undefined;

    public init() {
        const env = dotenv.load({
            AUTH_TOKEN: String,
            SERVER_PORT: Number
        });

        // assert.ok(env.PORT === 3000);

        this.auth_token = env.AUTH_TOKEN;
        this.port = env.SERVER_PORT;
    }

    private static encode (s: string) {
        return Buffer.from(s).toString("base64");
    }

    private static decode(s: string) {
        return Buffer.from(s).toString();
    }

    private async request(params: RequestParams) {
        const body = JSON.stringify({
            filename: params.filename,
            code: ServerDAO.encode(params.code)
        });

        try {
            const addr = `http://127.0.0.1:${this.port}/`;
            fetch(addr, {
                method: "post",
                body,
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": body.length.toString(),
                    "Authorization": `Bearer ${this.auth_token}`
                }
            }).then(
                async (value) => {
                    //console.log(await value.text())
                });
        } catch (e) {
            console.error(e);
            return false;
        }

    }

    public ping(): boolean {
        // TODO: implement
        return false;
    }

    public async upload(filename: string) {
        // if not exists
        // TODO

        const filepath: string = path.resolve(`./scripts/dist/${filename}`).toString(); // TODO: fix var names
        // console.log(`filepath: ${filepath}`)

        const code: string = fs.readFileSync(filepath);

        //console.log(`filename: ${filename}`);
        //console.log(`code: ${code}`);

        await this.request({
            action: RequestAction.CREATE,
            filename,
            code
        });
    }
}
