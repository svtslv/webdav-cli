export interface WebdavServerConfig {
  port: number,
  host: string,
  path: string,
  ssl: boolean,
  sslKey: string,
  sslCert: string,
  username: string,
  password: string,
}