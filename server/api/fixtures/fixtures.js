import axios from 'axios';
import config from '../../lib/config';
import saveFixturesDB from './db/saveFixtures';

export async function getFixtures(req, res) {
  try {
    const response = await axios({
      url: config.fixturesAPIUrl,
      method: 'get',
      headers: {
        'X-Auth-Token': config.fixturesAPIKey,
      },
    });

    res.send(response.data);
  } catch (err) {
    res.status(500).send('An error occurred:', err.message);
  }
}

export async function saveFixtures(req, res) {
  try {
    await saveFixturesDB(req.body);
    res.send(200);
  } catch (err) {
    res.status(500).send('An error occurred:', err.message);
  }
}
