export const environment = {
  server: { port: process.env.SERVER_PORT || 3000 },
  db: {url: process.env.DB_URL || 'mongodb://localhost/projetointegrador'},
  security: {
    saltRounds: process.env.SALT_ROUNDS || 10,
    enableHTTPS: process.env.ENABLE_HTTPS || false,
    certificate: process.env.CERTI_FILE || './security/keys/cert.pem',
    key: process.env.CERT_KEY_FILE || './security/keys/key.pem'
  }
}
