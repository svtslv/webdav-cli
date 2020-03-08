#!/usr/bin/env node

import * as chalk from 'chalk';
import * as figlet from 'figlet';
import { argv } from 'optimist';
import { WebdavCli } from './webdav-cli.server';
import { HOMEPAGE } from './webdav-cli.constants';

console.log(chalk.green(figlet.textSync('webdav-cli', { horizontalLayout: 'full' })));
console.log(chalk.green(`Homepage: ${ HOMEPAGE }\n`));

if (argv.help) {
  console.log([
    'usage: webdav-cli [options]',
    '',
    'options:',
    '  --path       Path to folder [process.cwd()]',
    '  --host       Host to use [127.0.0.1]',
    '  --port       Port to use [1900]',
    '  --digest     Enable digest authentication [basic]',
    '  --username   Username for basic/digest authentication [random]',
    '  --password   Password for basic/digest authentication [random]',
    '  --ssl        Enable https [false]',
    '  --sslKey     Path to ssl key file [self-signed]',
    '  --sslCert    Path to ssl cert file [self-signed]',
    '  --help       Print this list and exit',
    '  --version    Print the version and exit.',
    '  --rights     Comma separated values without spaces [all]', `
    'all', 'canCreate', 'canDelete', 'canMove', 'canRename', 
    'canAppend', 'canWrite', 'canRead', 'canSource', 
    'canGetMimeType', 'canGetSize', 'canListLocks', 
    'canSetLock', 'canRemoveLock', 'canGetAvailableLocks', 
    'canGetLock', 'canAddChild', 'canRemoveChild', 
    'canGetChildren', 'canSetProperty', 'canGetProperty', 
    'canGetProperties', 'canRemoveProperty', 'canGetCreationDate', 
    'canGetLastModifiedDate', 'canGetWebName', 'canGetType'`,
    '',
    'env:',
    '  WEBDAV_CLI_PATH, WEBDAV_CLI_HOST, WEBDAV_CLI_PORT,',
    '  WEBDAV_CLI_USERNAME, WEBDAV_CLI_PASSWORD,',
    '  WEBDAV_CLI_SSL, WEBDAV_CLI_SSL_KEY, WEBDAV_CLI_SSL_CERT,',
    '  WEBDAV_CLI_DIGEST, WEBDAV_CLI_RIGHTS',
    '',
  ].join('\n'));
  process.exit();
}

if (argv.version) {
  console.log('Version: ' + require('../package.json').version, '\n');
  process.exit();
}

const argvRights = argv.rights && typeof argv.rights === 'string' ? argv.rights.split(',') : undefined;
const envRights = process.env.WEBDAV_CLI_RIGHTS ? process.env.WEBDAV_CLI_RIGHTS.split(',') : undefined;

const config = {
  path: argv.path || process.env.WEBDAV_CLI_PATH,
  host: argv.host || process.env.WEBDAV_CLI_HOST,
  port: argv.port || parseInt(process.env.WEBDAV_CLI_PORT),
  digest: argv.digest || Boolean(process.env.WEBDAV_CLI_DIGEST),
  username: argv.username || process.env.WEBDAV_CLI_USERNAME,
  password: argv.password || process.env.WEBDAV_CLI_PASSWORD,
  ssl: argv.ssl || Boolean(process.env.WEBDAV_CLI_SSL),
  sslKey: argv.sslKey || process.env.WEBDAV_CLI_SSL_KEY,
  sslCert: argv.sslCert || process.env.WEBDAV_CLI_SSL_CERT,
  rights: argvRights || envRights,
};

const run = async() => {
  const webdavCli = new WebdavCli(config);
  const webdavCliServer = await webdavCli.start();
  webdavCliServer.on('log', (ctx, fs, path, log) => console.log(log));
};

run();

