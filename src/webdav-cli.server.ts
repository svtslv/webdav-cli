import * as fs from 'fs';
import { join } from 'path';
import { v2 as webdav } from 'webdav-server';
import { getRandomString } from './webdav-cli.utils';
import { RIGHTS } from './webdav-cli.constants';
import { WebdavCliServer, WebdavCliConfig, WebdavCliRights  } from './webdav-cli.interfaces';

export class WebdavCli {
  config: WebdavCliConfig;

  constructor(config: Partial<WebdavCliConfig>) {
    this.config = this.getConfig(config);
  }

  getConfig(config: Partial<WebdavCliConfig>): WebdavCliConfig {
    const selfSignedKey = join(__dirname, '/../certs/self-signed.key.pem');
    const selfSignedCert = join(__dirname, '/../certs/self-signed.cert.pem');

    const path = config.path || process.cwd();
    const host = config.host || '127.0.0.1';
    const port = config.port || 1900;

    const digest = Boolean(config.digest);
    let username = (config.username || getRandomString(16)).toString();
    let password = (config.password || getRandomString(16)).toString();

    const ssl = Boolean(config.ssl);
    const sslKey = ssl ? fs.readFileSync(config.sslKey || selfSignedKey).toString() : '';
    const sslCert = ssl ? fs.readFileSync(config.sslCert || selfSignedCert).toString() : '';

    const disableAuthentication = Boolean(config.disableAuthentication);

    if(disableAuthentication) {
      config.rights = config.rights || ['canRead'];
      username = '';
      password = '';
    }

    const rights = (config.rights || ['all']).filter((item: WebdavCliRights[number]) => RIGHTS.includes(item));
    const url = `${ ssl ? 'https' : 'http' }://${ host }:${ port }`;

    const directory = Boolean(config.directory);
    const autoIndex = Boolean(config.autoIndex);

    return { 
      host, path, port, username, digest, password, ssl, sslCert, 
      sslKey, rights, url, disableAuthentication, directory, autoIndex,
    };
  }

  async start(): Promise<WebdavCliServer> {
    const config = this.config;

    const userManager = new webdav.SimpleUserManager();
    const user = userManager.addUser(config.username, config.password, false);

    const privilegeManager = new webdav.SimplePathPrivilegeManager();
    privilegeManager.setRights(user, '/', config.rights);

    const authentication = config.digest ? 'HTTPDigestAuthentication' : 'HTTPBasicAuthentication';

    const server = new webdav.WebDAVServer({
      httpAuthentication: config.disableAuthentication ? { 
        askForAuthentication: () => ({}),
        getUser: (ctx, gotUserCallback) => { 
          userManager.getDefaultUser((defaultUser) => { 
            privilegeManager.setRights(defaultUser, '/', config.rights);
            gotUserCallback(null, defaultUser);
          });
        }
      } : new webdav[authentication](userManager, 'Default realm'),
      privilegeManager: privilegeManager,
      https: config.ssl ? { cert: config.sslCert, key: config.sslKey } : null,
      port: config.port,
      hostname: config.host,
    }) as WebdavCliServer;

    server.config = config;

    server.beforeRequest(async (ctx, next) => {
      if (config.directory) {
        const isBrowser = ctx.request.headers['user-agent'].search('Mozilla/5.0') !== -1;
        if(isBrowser) {
          try {
            const resource = await server.getResourceAsync(ctx, ctx.requested.uri);
            const list = await resource.readDirAsync();
            const uri = ctx.requested.uri.slice(-1) === '/' ? ctx.requested.uri : ctx.requested.uri + '/';
            if(config.autoIndex && list.includes('index.html')) {
              ctx.requested.path = `${uri}index.html` as any;
            } else {
              const up =  `<a href="${ uri.split('/').slice(0, -2).join('/') || '/' }">..</a><br/>`;
              const html = up + list.map(item => `<a href="${ uri + item }">${ item }</a><br/>`).join('');
              // ctx.response.setHeader('Content-Type', 'text/html;charset=UTF-8');
              ctx.response.end(`<html><head><meta charset="UTF-8"></head><body>${html}</body></html>`);
            }
          } catch {}
        }
      }
      next();
    });

    server.afterRequest((arg, next) => {
      const log =  `>> ${ arg.request.method } ${ arg.requested.uri } > ${ arg.response.statusCode } ${ arg.response.statusMessage }`;
      server.emit('log', null, null, '/', log);
      next();
    });

    await server.setFileSystemAsync('/', new webdav.PhysicalFileSystem(config.path));
    await server.startAsync(config.port);

    const logs = [
      `Server running at ${ config.url }`,
      `[rights]: ${ config.rights }`,
      `[digest]: ${ config.digest }`,
      `username: ${ config.username }`,
      `password: ${ config.password }`,
      'Hit CTRL-C to stop the server',
      'Run with --help to print help'
    ];

    console.log(logs.join('\n'));

    return server;
  }
}
