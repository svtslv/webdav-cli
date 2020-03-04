export interface WebdavServerConfig {
  path: string,
  port: number,
  host: string,
  username: string,
  password: string,
  digest: boolean,
  ssl: boolean,
  sslKey: string,
  sslCert: string,
}