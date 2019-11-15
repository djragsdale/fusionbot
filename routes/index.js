'use strict';

const { Router } = require('express');

const debug = require('./debug');
const webhooks = require('./webhooks');

module.exports = Router()
  .get('/', (req, res) => {
    debug('Routes are not currently handled');
    res.send('Routes are not currently handled');
  })
  .use('/webhooks', webhooks);
