const dotenv = require("dotenv");
const glob = require("glob");
const gulp = require("gulp");
const ts = require("gulp-typescript");
const requests = require("requests");

const tsProject = ts.createProject('tsconfig.json');

gulp.task('build',
    () => tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('dist'))
);

gulp.task('deploy', () => {
    dotenv.config();
    const AUTH_TOKEN: string | undefined = process.env.TOKEN;

    if(AUTH_TOKEN === undefined) {
        console.error('Could not retrieve "AUTH_TOKEN" from ".env" file.');
        process.exit(1);
    }

    // https://github.com/bitburner-official/bitburner-vscode/blob/master/src/extension.js
    const BB_GAME_CONFIG = {
        port: 9990,
        schema: `http`,
        url: `localhost`,
        filePostURI: `/`,
        validFileExtensions: [`.js`, `.script`, `.ns`, `.txt`],
    };

    //

    enum BBRequestAction {
        CREATE,
        UPDATE,
        UPSERT,
        DELETE
    }

    interface BBRequestParams {
        action: BBRequestAction,
        filename: string,
        code: string
    }

    //

    /**
     * Make a POST request to the expected port of the game
     * @param {{ action: `CREATE` | `UPDATE` | `UPSERT` | `DELETE`, filename: string, code?: string }} payload The payload to send to the game client
     */
    const doPostRequestToBBGame = (payload: BBRequestParams) => {
        const cleanPayload = {
            filename: `${payload.filename}`.replace(/[\\|/]+/g, `/`),
            code: Buffer.from(payload.code).toString(`base64`),
        };
        if (/\//.test(cleanPayload.filename)) {
            cleanPayload.filename = `/${cleanPayload.filename}`;
        }

        const stringPayload = JSON.stringify(cleanPayload);

        const options = {
            hostname: BB_GAME_CONFIG.url,
            port: BB_GAME_CONFIG.port,
            path: BB_GAME_CONFIG.filePostURI,
            method: `POST`,
            headers: {
                "Content-Type": `application/json`,
                "Content-Length": stringPayload.length,
                Authorization: `Bearer ${AUTH_TOKEN}`,
            },
        };

        const url: string = (
            `${BB_GAME_CONFIG.schema}://${BB_GAME_CONFIG.url}:${BB_GAME_CONFIG.port}/`
        );

        const request_options = {
            streaming: false,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": stringPayload.length,
                Authorization: `Bearer ${AUTH_TOKEN}`,
            },
        };

        requests(url, options)
            .on('data', function (chunk: any) {
                console.log(`ondata: (${typeof chunk}) ${chunk}`);
            })
            .on('end', function (err: any | undefined) {
                if (err) {
                    return console.error('connection closed due to errors', err);
                }
                // console.log('end');
            });

        /*const req = http.request(options, (res) => {
            res.on(`data`, (d) => {
                const responseBody = Buffer.from(d).toString();

                switch (res.statusCode) {
                    case 200:
                        showToast(`${cleanPayload.filename} has been uploaded!`);
                        break;
                    case 401:
                        showToast(`Failed to push ${cleanPayload.filename} to the game!\n${responseBody}`, `error`);
                        break;
                    default:
                        showToast(`File failed to push, statusCode: ${res.statusCode} | message: ${responseBody}`, `error`);
                        break;
                }
            });*/


        // const files = glob(`./dist/**/*.js`)

    }



});
