'use strict';

const debug = require('debug')('bots');
const SimpleSlackbot = require('simple-slackbot');

const FusionBotConfig = require('./fusionbot');

const defaultConfig = {
};

function SlackBotManager(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg,
  };
  // const {
  //   asyncStore
  // } = config;

  this.run = () => {
    const fusionBotConfig = new FusionBotConfig();
    const fusionBot = new SimpleSlackbot(
      fusionBotConfig.name,
      config.SLACK_FUSIONBOTTOKEN,
      fusionBotConfig.emoji,
      fusionBotConfig.hooks || {},
      fusionBotConfig.triggers || {},
    );
    fusionBot.run();
    debug('Running fusionBot');
  };

  return this;
}

module.exports = SlackBotManager;
