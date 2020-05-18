var Twit = require('twit');
require('dotenv').config();
var express = require('express');
var app = express();
var fs = require('fs');
var schedule = require('node-schedule');

//adiciona ao array.prototype uma função que retorna um número aleátorio
Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const Bot = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

//define a porta do app
var porta = process.env.PORT || 8080;
app.listen(porta);

//função do bot
var j = schedule.scheduleJob({ hour: 15, minute: 0 },
  function botInit() {
    require('./data');
    var posts = JSON.parse(fs.readFileSync('posts.json', 'utf-8'));
    if (posts['toCome'].length > 0) {//se ainda tiver posts
      var postNow = posts['toCome'].randomElement();
      var indexNow = posts['toCome'].indexOf(postNow);
      posts['toCome'].splice(indexNow, 1);
      posts['already'].push(postNow);
      var status = postNow['phrase'] + "\n - " + postNow['nameSong'] +
        " (" + postNow['albumName'] + ", " + postNow['albumYear'] + ")";
      Bot.post('statuses/update', {
        status: status
      },
        function (err, data, response) {
          fs.writeFileSync('./posts.json', JSON.stringify(posts));
        });
    } else {//quando não tiver mais posts
      Bot.post('statuses/update', {
        status: "Fim do Bot! Obrigado por acompanhar"
      },
        function (err, data, response) {
          j.cancel();
        });
    }
  }
);
//time = setInterval(botInit, 60 * 1000);
//botInit();
