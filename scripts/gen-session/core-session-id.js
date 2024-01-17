/**
 *  Generate session id
 * 
 * Usage: 
 * npm run gen-session  --username=123 --password=456
 */
const path = require('path');

const MODE = process.env.npm_config_mode;
const USER = process.env.npm_config_username;
const PASS = process.env.npm_config_password;

const http = require('http');
const url = require('url');
const fs = require('fs');
const port = 3000;

http.createServer(function (request, response) {
    const requestUrl = url.parse(path.resolve(__dirname, './run.html'));
    response.writeHead(200);
    fs.createReadStream(requestUrl.pathname).pipe(response);  // do NOT use fs's sync methods ANYWHERE on production (e.g readFileSync) 
}).listen(port);

const start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
require('child_process').exec(start + ' ' + `http://localhost:${port}?u=${USER}-----${PASS}-----${MODE}`);

