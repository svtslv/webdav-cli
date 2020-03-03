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
    '',
    '  --ssl        Enable https [false]',
    '  --sslKey     Path to ssl key file [self-signed]',
    '  --sslCert    Path to ssl cert file [self-signed]',
  ].join('\n'));
  process.exit();
}