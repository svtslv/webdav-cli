import { v2 as webdav } from 'webdav-server';
import { WebdavServerConfig } from './webdav-cli.interfaces';

export async function runServer(config: WebdavServerConfig) {

  const userManager = new webdav.SimpleUserManager();
  const user = userManager.addUser(config.username, config.password, false);

  const privilegeManager = new webdav.SimplePathPrivilegeManager();
  privilegeManager.setRights(user, '/', config.rights);

  const authentication = config.digest ? 'HTTPDigestAuthentication' : 'HTTPBasicAuthentication';

  const server = new webdav.WebDAVServer({
    httpAuthentication: new webdav[authentication](userManager, 'Default realm'),
    privilegeManager: privilegeManager,
    https: config.ssl ? { cert: config.sslCert, key: config.sslKey } : null,
    port: config.port,
    hostname: config.host,
  });

  server.setFileSystem('/', new webdav.PhysicalFileSystem(config.path), () => {
    const host = `${ config.ssl ? 'https' : 'http' }://${ config.host }:${ config.port }/`;
    server.start(() => {
      console.log(`Server running at ${ host }`);
      console.log(`[rights]: ${ config.rights.join(', ') }`);
      console.log(`username: ${ config.username }`);
      console.log(`password: ${ config.password }`);
      console.log('Hit CTRL-C to stop the server');
      console.log('Run with --help to print help');
    });
  });

  server.beforeRequest(async (ctx, next) => {
    const isBrowser = ctx.request.headers['user-agent'].search('Mozilla/5.0') !== -1;
    if(isBrowser) {
      try {
        const resource = await server.getResourceAsync(ctx, ctx.requested.uri);
        const list = await resource.readDirAsync();
        const uri = ctx.requested.uri.slice(-1) === '/' ? ctx.requested.uri : ctx.requested.uri + '/';
        const up =  `<a href="${ uri.split('/').slice(0, -2).join('/') || '/' }">..</a><br/>`;
        const html = up + list.map(item => `<a href="${ uri + item }">${ item }</a><br/>`).join('');
        ctx.response.setHeader('Content-Type', 'text/html');
        ctx.response.end(html);
      } catch {}
    }
    next();
  });

  server.afterRequest((arg, next) => {
    console.log('>>', arg.request.method, arg.requested.uri, '>', arg.response.statusCode, arg.response.statusMessage);
    next();
  });
}
