const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const getLatestEvents = require("./queries").getLatestEvents;
const getEvent = require("./queries").getEvent;
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/events', async function(req, res) {
  try {
    const events = await getLatestEvents();
    res.json({success: true, events, url: req.url});
  } catch (error) {
    console.log(error);
    res.json({success: false, events: [], url: req.url});
  }
});

app.get('/events/:id', async function(req, res) {
  try {
    const event = await getEvent(req.params.id);
    res.json({success: true, event, url: req.url});
  } catch (error) {
    res.json({success: false, event: {}, url: req.url});
  }
});

app.listen(3000, function() {
    console.log("App started");
});


module.exports = app;
