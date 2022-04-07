const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const getLatestEvents = require("./queries").getLatestEvents;
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

app.get('/events/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});


app.listen(3000, function() {
    console.log("App started");
});


module.exports = app;
