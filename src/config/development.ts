export const development =
{
  app:
  {
    frontEndUrl: "https://devapp.xxxx.com",
    frontEndQRUrl: "https://devqr.xxxx.com",
    tinyUrl: "http://localhost:3000",
    port: 3000,
    logLevel: 'debug'
  },


  telemetry:
  {
    enabled: true,
    statsd:
    {
      host: "statsd",
      port: 8125
    }
  },

  mongodb:
  {
    url: 'xxxxxxxxxxxxxxxxxxx'
  },

  authentication: {
    uuidNamespace: '11671a64-4022-491e-9120-da01ff11111',
    secretKey: 'XXXXXXXXXXXXXXXXXbXXXXXXXXXXXX',
    tokenExpiryInSecs: 86500,
    customerTokenExpiryInSecs: 86400
  },



};
