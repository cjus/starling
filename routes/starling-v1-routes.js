/**
 * @name hello-v1-api
 * @description This module packages the Hello API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = hydra.getServerResponseHelper();
let serverResponse = new ServerResponse();

let api = express.Router();

api.get('/:command', (req, res) => {
  let command = req.params.command;
  let instanceInfo = `From: ${hydra.getServiceName()} - ${hydra.getInstanceID()}`;

  if (command === 'delay:1000') {
    setTimeout(() => {
      serverResponse.sendOk(res, {
        result: {
          msg: `From: ${instanceInfo}`,
          command: req.params.command
        }
      });
    }, 1000);
    return;
  }

  if (command === 'delay:2000') {
    setTimeout(() => {
      serverResponse.sendOk(res, {
        result: {
          msg: `From: ${instanceInfo}`,
          command: req.params.command
        }
      });
    }, 2000);
    return;
  }

  if (command === 'stall') {
    for (let i = 0; i < 1000000; i++) {
      for (let j = 0; j < 10000; j++) {
        // do nothing
      }
    }
    serverResponse.sendOk(res, {
      result: {
        msg: `From: ${instanceInfo}`,
        command: req.params.command
      }
    });
    return;
  }

  if (command === 'rstall') {
    let min = 0;
    let max = 49;
    let r = Math.floor(Math.random() * (max - min)) + min;
    if (r === 0) {
      for (let i = 0; i < 1000000; i++) {
        for (let j = 0; j < 10000; j++) {
          // do nothing
        }
      }
    }
    serverResponse.sendOk(res, {
      result: {
        msg: `From: ${instanceInfo}`,
        command: req.params.command
      }
    });
    return;
  }

  if (command === 'error') {
    throw new Error('oh snap!');
  }

  if (command === 'crash') {
    serverResponse.sendOk(res, {
      result: {
        msg: `Shutting down: ${instanceInfo}`,
        command: req.params.command
      }
    });
    process.exit(-1);
  }

  serverResponse.sendOk(res, {
    result: {
      msg: `From: ${instanceInfo}`,
      command: req.params.command
    }
  });
});

module.exports = api;
