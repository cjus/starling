/**
* @name Starling
* @summary Starling Hydra Express service entry point
* @description test service
*/
const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();

const HydraExpressLogger = require('fwsp-logger').HydraExpressLogger;
hydraExpress.use(new HydraExpressLogger());

/**
* Load configuration file and initialize hydraExpress app.
*/
hydraExpress.init(`${__dirname}/config/config.json`, () => {
  hydraExpress.registerRoutes({
    '/v1/starling': require('./routes/starling-v1-routes')
  });
})
  .then((serviceInfo) => {
    let logEntry = `Started ${hydra.getServiceName()} (v.${hydra.getInstanceVersion()})`;
    console.log(logEntry);
    console.log(serviceInfo);
  })
  .catch((err) => {
    hydraExpress.log('fatal', err);
    console.log('err', err);
  });
