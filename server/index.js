const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const URL = 'http://api.football-data.org/v1/competitions/445/fixtures?matchday=18';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Put all API endpoints under '/api'
app.get('/api/fixtures', (req, res) => {
  axios({
    url: URL,
    method: 'get',
    headers: {
      'X-Auth-Token': '1d47b8ba06f7421dadc29a4d4bac5d93'
    }
  }).then((response) => {
    res.send(response.data);
  });

  console.log(`Sent fixtures`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join( __dirname + '../client/build/index.html'));
});

const port = process.env.PORT || 8099;
app.listen(port);

console.log(`Predictor backend server listening on ${port}`);
