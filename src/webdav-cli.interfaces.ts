import { BasicPrivilege } from "webdav-server";

export type Rights = BasicPrivilege[];

export interface WebdavServerConfig {
  path: string,
  host: string,
  port: number,
  digest: boolean,
  username: string,
  password: string,
  ssl: boolean,
  sslKey: string,
  sslCert: string,
  rights: Rights,
}