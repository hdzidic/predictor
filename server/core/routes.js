import express from 'express';

import config from '../lib/config';
import fixtureRoutes from '../api/fixtures/routes';
import userRoutes from '../api/users/routes';

const router = express.Router({
  strict: true,
});

router.use('/api/fixtures', fixtureRoutes);
router.use('/api/users', userRoutes);

router.use(express.static(config.static));


router.use((req, res) => {
  res.status(404).send('Not Found');
});

export default router;
