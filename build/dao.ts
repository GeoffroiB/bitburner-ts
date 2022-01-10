import path from "path";

const fetch = require("node-fetch");
const fs = require("fs");
const dotenv = require("ts-dotenv");

import { strict as assert } from 'assert';

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
    private readonly auth_token: string | undefined;
    private readonly port: number | undefined;

    public constructor() {
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

            const response = await fetch(
                addr, {
                    method: "post",
                    body,
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": body.length.toString(),
                        "Authorization": `Bearer ${this.auth_token}`
                    }
                });
            const result = await response.text();
            return result;

        } catch (e) {
            console.error(e);
            return null;
        }

    }

    public async ping() {
        const start = new Date().getTime();
        const result = await this.request({
            action: RequestAction.CREATE, // useless
            filename:"",
            code:""
        });
        const end = new Date().getTime();
        return result === "not a script file" ? (end - start) : null;
    }

    public async upload(filename: string) {
        // if not exists
        // TODO

        const filepath: string = path.resolve(`./dist/${filename}`).toString(); // TODO: fix var names
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
