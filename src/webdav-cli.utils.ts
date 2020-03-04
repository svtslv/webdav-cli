export function getHelp() {
  console.log([
    'usage: webdav-cli [options]',
    '',
    'options:',
    '  --path       Path to folder [process.cwd()]',
    '  --port       Port to use [1900]',
    '  --host       Host to use [127.0.0.1]',
    '  --username   Username for basic authentication [random]',
    '  --password   Password for basic authentication [random]',
    '  --digest     Enable digest authentication [false]',
    '  --ssl        Enable https [false]',
    '  --sslKey     Path to ssl key file [self-signed]',
    '  --sslCert    Path to ssl cert file [self-signed]',
    '  --help       Print this list and exit',
    '  --version    Print the version and exit.',
    '',
    'env:',
    '  WEBDAV_CLI_PATH, WEBDAV_CLI_PORT, WEBDAV_CLI_HOST,',
    '  WEBDAV_CLI_USERNAME, WEBDAV_CLI_PASSWORD, WEBDAV_CLI_DIGEST,',
    '  WEBDAV_CLI_SSL, WEBDAV_CLI_SSL_KEY, WEBDAV_CLI_SSL_CERT',
    '',
  ].join('\n'));
  process.exit();
}

export function getVersion() {
  console.log('Version: ' + require('../package.json').version, '\n');
  process.exit();
}