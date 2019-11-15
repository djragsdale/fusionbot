'use strict';

const { Router } = require('express');

const starbucks = require('./starbucks');

module.exports = Router()
  .use('/starbucks', starbucks);
