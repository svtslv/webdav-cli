import { BasicPrivilege, v2 as webdav } from 'webdav-server';

export type WebdavCliRights = BasicPrivilege[];

export interface WebdavCliConfig {
  path: string,
  host: string,
  port: number,
  digest: boolean,
  username: string,
  password: string,
  ssl: boolean,
  sslKey: string,
  sslCert: string,
  rights: WebdavCliRights,
  disableAuthentication?: boolean,
  url?: string,
  directory?: boolean,
  autoIndex?: boolean,
}

export interface WebdavCliServer extends webdav.WebDAVServer {
  config: WebdavCliConfig,
}