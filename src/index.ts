#!/usr/bin/env node

import * as chalk from 'chalk';
import * as figlet from 'figlet';
import * as fs from 'fs';
import { argv } from 'optimist';
import { runServer } from './webdav-cli.server';
import { getHelp, getVersion } from './webdav-cli.utils';

const selfSignedKey = __dirname + '/../certs/self-signed.key.pem';
const selfSignedCert = __dirname + '/../certs/self-signed.cert.pem';
const path = argv.path || process.env.WEBDAV_CLI_PATH || process.cwd();
const port = argv.port || process.env.WEBDAV_CLI_PORT || 1900;
const host = argv.host || process.env.WEBDAV_CLI_HOST || '127.0.0.1';
const username = argv.username || process.env.WEBDAV_CLI_USERNAME || Math.random().toString(36).replace(/[^a-z]+/g, '');
const password = argv.password || process.env.WEBDAV_CLI_PASSWORD || Math.random().toString(36).replace(/[^a-z]+/g, '');
const digest = argv.digest || process.env.WEBDAV_CLI_DIGEST || false;
const ssl = argv.ssl || process.env.WEBDAV_CLI_SSL || false;
const sslKey = fs.readFileSync(argv.sslKey || process.env.WEBDAV_CLI_SSL_KEY || selfSignedKey).toString();
const sslCert = fs.readFileSync(argv.sslCert || process.env.WEBDAV_CLI_SSL_CERT || selfSignedCert).toString();

console.log(chalk.green(figlet.textSync('webdav-cli', { horizontalLayout: 'full' })));

if (argv.help) {
  getHelp();
}

if (argv.version) {
  getVersion();
}

runServer({ path, host, port, username, password, digest, ssl, sslCert, sslKey });