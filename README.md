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

```bash
npm i -g webdav-cli
```

## Examples

```bash
npx webdav-cli --help
```

```bash
  'usage: webdav-cli [options]',
  '',
  'options:',
  '  --path       Path to folder [process.cwd()]',
  '  --port       Port to use [1900]',
  '  --host       Host to use [127.0.0.1]',
  '  --username   Username for basic authentication [auto]',
  '  --password   Password for basic authentication [auto]',
  '',
  '  --ssl        Enable https [false]',
  '  --sslKey     Path to ssl key file [self-signed]',
  '  --sslCert    Path to ssl cert file [self-signed]',
```

## License

MIT
