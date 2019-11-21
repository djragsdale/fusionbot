'use strict';

/* eslint-disable no-console */

const getContent = require('./util/getContent');

const pingUrl = process.env.PING_URL;

if (pingUrl) {
  getContent(pingUrl)
    .then((html) => console.log('response', html))
    .catch((err) => console.error('error', err));
} else {
  console.log('PING_URL environment variable is missing');
}
