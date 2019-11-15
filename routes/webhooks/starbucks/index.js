'use strict';

const { Router } = require('express');

const comlink = require('../../../comlinks/fusionbot');
const debug = require('../debug').extend('starbucks');

module.exports = Router()
  .get('/', () => {
    debug('Incoming get starbucks webhook');
    const error = new Error('Nope');
    error.status = 418;
    throw error;
  })
  .post('/', (req, res) => {
    debug('Post to starbucks');
    debug(req.body);
    debug(req.rawBody);
    res.send('Success');

    comlink.emit('webhook');
  });
