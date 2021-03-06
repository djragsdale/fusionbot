'use strict';

const debug = require('debug')('server');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
// const path = require('path');

// Import Routes and Route Factories
const routes = require('./routes/index');

// Storage


// Initialize Slack bots
if (process.env.SLACKBOTS_DISABLED !== 'true') {
  // eslint-disable-next-line global-require
  const SlackBotManager = require('./bots');
  const slackCfgKeys = Object.keys(process.env).filter((key) => key.substring(0, 6) === 'SLACK_');
  const slackCfg = {};
  slackCfgKeys.forEach((key) => {
    slackCfg[key] = process.env[key];
  });
  const slackbots = new SlackBotManager(slackCfg);
  slackbots.run();
}

const app = express();

app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
  extended: true,
})); // support encoded bodies
// app.use(cookieParser());

// Required for Alexa
const rawBodySaver = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};
app.use(bodyParser.raw({
  verify: rawBodySaver,
  type: () => true,
})); // Try to parse the body as raw
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    debug('Development error handler');
    debug(err.message);
    res
      .status(err.status || 500)
      .send(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  debug('Production error handler');
  debug(err.message);
  res
    .status(err.status || 500)
    .sendStatus(err.status);
});


module.exports = app;
