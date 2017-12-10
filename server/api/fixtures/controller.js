import config from '../../lib/config';
import axios from 'axios';

export function getFixtures(req, res) {
  axios({
    url: config.fixturesAPIUrl,
    method: 'get',
    headers: {
      'X-Auth-Token': config.fixturesAPIKey
    }
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    res.status(500).send('An error occurred');
  });
}
