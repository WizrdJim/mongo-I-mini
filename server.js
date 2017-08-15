const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Bears = require('./models.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());



// TODO: write your server code here

server.post('/bears', (req, res) => {
  const { species, latinName } = req.body;
  if(!species || !latinName) {
    res.status(422);
    res.json({ error: "C'mon man give me the good stuff" })
    return;
  }
  const bear = new Bears({ species, latinName });
  bear.save((err) => {
    if (err) {
      res.status(500);
      res.json({ error: "Server error"});
    }
    res.json(bear);
  })
})
server.get('/bears', (req, res) => {
  Bears.find({}, (err, data) => {
    if (err) {
      res.status(500);
      res.json({ error: "Server error"})
    }
    res.json(data);
  })
})
server.get('/bears/:id', (req, res) => {
  const { id } = req.params;
  Bears.findById(id, (err, bear) => {
    if (err) {
      res.status(500);
      res.json
    }
    res.json(bear);
  })
})



mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/bears',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});
