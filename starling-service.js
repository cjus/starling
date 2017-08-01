/**
* @name Starling
* @summary Starling Hydra Express service entry point
* @description test service
*/
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();

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
    console.log('err', err);
  });
