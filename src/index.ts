#!/usr/bin/env node

import * as fs from 'fs';
import { join } from 'path';
import { argv } from 'optimist';
import { runServer } from './webdav-cli.server';
import { getHelp, getVersion, getLogo } from './webdav-cli.utils';
import { Rights } from './webdav-cli.interfaces';

const selfSignedKey = join(__dirname, '/../certs/self-signed.key.pem');
const selfSignedCert = join(__dirname, '/../certs/self-signed.cert.pem');
const path = argv.path || process.env.WEBDAV_CLI_PATH || process.cwd();
const host = argv.host || process.env.WEBDAV_CLI_HOST || '127.0.0.1';
const port = argv.port || process.env.WEBDAV_CLI_PORT || 1900;
const digest = argv.digest || process.env.WEBDAV_CLI_DIGEST || false;
const username = argv.username || process.env.WEBDAV_CLI_USERNAME || Math.random().toString(36).replace(/[^a-z]+/g, '');
const password = argv.password || process.env.WEBDAV_CLI_PASSWORD || Math.random().toString(36).replace(/[^a-z]+/g, '');
const ssl = argv.ssl || process.env.WEBDAV_CLI_SSL || false;
const sslKey = fs.readFileSync(argv.sslKey || process.env.WEBDAV_CLI_SSL_KEY || selfSignedKey).toString();
const sslCert = fs.readFileSync(argv.sslCert || process.env.WEBDAV_CLI_SSL_CERT || selfSignedCert).toString();

const allRights: Rights  = [
  'all', 'canCreate', 'canDelete', 'canMove', 'canRename', 
  'canAppend', 'canWrite', 'canRead', 'canSource', 
  'canGetMimeType', 'canGetSize', 'canListLocks', 
  'canSetLock', 'canRemoveLock', 'canGetAvailableLocks', 
  'canGetLock', 'canAddChild', 'canRemoveChild', 
  'canGetChildren', 'canSetProperty', 'canGetProperty', 
  'canGetProperties', 'canRemoveProperty', 'canGetCreationDate', 
  'canGetLastModifiedDate', 'canGetWebName', 'canGetType',
];

argv.rights = argv.rights || process.env.WEBDAV_CLI_RIGHTS;
argv.rights = argv.rights && typeof argv.rights === 'string' ? argv.rights : 'all';
const rights: Rights = argv.rights.split(',').filter((item: Rights[number]) => allRights.includes(item));

getLogo();

if (argv.help) {
  getHelp();
}

if (argv.version) {
  getVersion();
}

runServer({ host, path, port, username, digest, password, ssl, sslCert, sslKey, rights });