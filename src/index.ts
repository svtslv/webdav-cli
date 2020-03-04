#!/usr/bin/env node

import * as chalk from 'chalk';
import * as figlet from 'figlet';
import * as fs from 'fs';
import { argv } from 'optimist';
import { runServer } from './webdav-cli.server';
import { getHelp, getVersion } from './webdav-cli.utils';

const path = process.env.WEBDAV_CLI_PATH || argv.path || process.cwd();
const port = process.env.WEBDAV_CLI_PORT || argv.port || 1900;
const host = process.env.WEBDAV_CLI_HOST || argv.host || '127.0.0.1';
const username = process.env.WEBDAV_CLI_USERNAME || argv.username || Math.random().toString(36).replace(/[^a-z]+/g, '');
const password = process.env.WEBDAV_CLI_PASSWORD || argv.password || Math.random().toString(36).replace(/[^a-z]+/g, '');
const ssl = process.env.WEBDAV_CLI_SSL || argv.ssl || false;
const sslKey = fs.readFileSync(process.env.WEBDAV_CLI_SSL_KEY || argv.sslKey || __dirname + '/../certs/self-signed.key.pem').toString();
const sslCert = fs.readFileSync(process.env.WEBDAV_CLI_SSL_CERT || argv.sslCert || __dirname + '/../certs/self-signed.cert.pem').toString();

console.log(chalk.green(figlet.textSync('webdav-cli', { horizontalLayout: 'full' })));

if (argv.help) {
  getHelp();
}

if (argv.version) {
  getVersion();
}

runServer({ path, host, port, username, password, ssl, sslCert, sslKey });