# WebDAV CLI

<a href="https://www.npmjs.com/package/webdav-cli"><img src="https://img.shields.io/npm/v/webdav-cli.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/webdav-cli"><img src="https://img.shields.io/npm/l/webdav-cli.svg" alt="Package License" /></a>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Examples](#examples)
- [License](#license)

## Description
A simple zero-configuration command-line webdav server

## Installation

#### Globally via `npm`

```bash
npm install --global webdav-cli
```

#### Running on-demand:

```bash
npx webdav-cli [options]
```

## Examples

```bash
npx webdav-cli --help
```

```bash
  'usage: webdav-cli [options]',
  'options:',
  '  --path       Path to folder [process.cwd()]',
  '  --port       Port to use [1900]',
  '  --host       Host to use [127.0.0.1]',
  '  --username   Username for basic authentication [random]',
  '  --password   Password for basic authentication [random]',
  '  --ssl        Enable https [false]',
  '  --sslKey     Path to ssl key file [self-signed]',
  '  --sslCert    Path to ssl cert file [self-signed]',
```

## TLS/SSL

First, you need to make sure that openssl is installed correctly, and you have `key.pem` and `cert.pem` files. You can generate them using this command:
```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```
Use `127.0.0.1` as value for `Common name` if you want to be able to install the certificate in your OS's root certificate store or browser so that it is trusted.

Then you need to run the server with `--ssl` for enabling SSL and `--sslKey=key.pem --sslCert=cert.pem` for your certificate files.

## License

MIT
