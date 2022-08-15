'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
// const config = {
//   channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
//   channelSecret: process.env.CHANNEL_SECRET,
// };

const config = {
  channelAccessToken: "jJCvKhMswLwBoZYTLtcEZBssFE1EL6XbrHTRv3Sw7nln8851h3roQ/+P7UGYB7NjqibbtOB83b8Xx8QQs1OqgftOWw94Y08ClWmDZGOgK65Q9e/J29un5qZQKpAsa+eFbSCq43VXI2DuThIn8tyZaAdB04t89/1O/w1cDnyilFU=",
  channelSecret: "e8d751536b24bc20276c7c2206f6fb41",
};
// ID: 1653789530

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
