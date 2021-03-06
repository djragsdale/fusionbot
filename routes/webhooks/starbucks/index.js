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
    res.send('Success');

    if (req.rawBody && req.rawBody.includes('SUBJECT<<><<')) {
      // const [subject, body] = req.rawBody.pa
      comlink.emit('starbucks', ({
        rawBody: req.rawBody,
      }));
    } else {
      debug('rawBody error');
      debug(typeof req.rawBody);
    }
  });
