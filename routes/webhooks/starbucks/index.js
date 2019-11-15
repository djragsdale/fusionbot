'use strict';

const { Router } = require('express');

const debug = require('../debug').extend('starbucks');

module.exports = Router()
  .get('/', (req, res) => {
    debug('Incoming get starbucks webhook');
    res.status(418).send('Nope');
  })
  .post('/', (req, res) => {
    debug('Post to starbucks');
    res.send('Success');
  });
