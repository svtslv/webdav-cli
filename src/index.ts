#!/usr/bin/env node

import * as chalk from 'chalk';
import * as figlet from 'figlet';
import * as fs from 'fs';
import { argv } from 'optimist';
import { runServer } from './webdav-cli.server';
import { getHelp } from './webdav-cli.utils';

const path = argv.path || process.cwd();
const port = argv.port || 1900;
const host = argv.host || '127.0.0.1';
const username = argv.username || Math.random().toString(36).replace(/[^a-z]+/g, '');
const password = argv.password || Math.random().toString(36).replace(/[^a-z]+/g, '');
const ssl = argv.ssl || false;
const key = argv.sslKey || __dirname + '/../certs/self-signed.key.pem';
const cert = argv.sslCert || __dirname + '/../certs/self-signed.cert.pem';
const sslKey = fs.readFileSync(key).toString();
const sslCert = fs.readFileSync(cert).toString();

console.log(chalk.green(figlet.textSync('webdav-cli', { horizontalLayout: 'full' })));

if (argv.help) {
  getHelp();
}

runServer({ path, host, port, username, password, ssl, sslCert, sslKey });