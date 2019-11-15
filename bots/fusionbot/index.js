'use strict';

const debug = require('debug')('fusionbot');

const comlink = require('../../comlinks/fusionbot');

const whisper = debug.extend('whisper');

const name = 'fusionbot';

module.exports = function FusionBotFactory() {
  this.name = name;
  this.emoji = ':fusion:';
  this.hooks = {
    onChannelMention(reply, message, fromUser) {
      debug(`${name} got mentioned in a channel by ${fromUser.name}`);
      whisper(`text "${message.text}"`);
      // reply(`I didn't catch that. What was it you wanted?`);
      reply(`I'm sorry, I don't handle channel messages quite yet.`);
    },
    onDirectMessage(reply, message, fromUser) {
      debug(`${name} got messaged directly by ${fromUser.name}`);
      whisper(`text "${message.text}"`);
      reply(`I'm sorry, I don't handle private conversations quite yet.`);
    },
    onStart(reply) {
      debug(`${name} is restarting.`);

      comlink.on('starbucks', ({ body, rawBody }) => {
        debug('Received starbucks comlink');
        debug(rawBody);
        debug(JSON.stringify(body, null, 2));
        reply(rawBody);
      });
    },
  };
  this.triggers = {
    'starbucks machine': (reply, message) => {
      debug(`Triggered with keyword "starbucks machine" and text "${message}"`);
    },
  };
};
