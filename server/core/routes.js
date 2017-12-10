import express from 'express';

import config from '../lib/config';
import fixtureRoutes from '../api/fixtures/routes'

const router = express.Router({
  strict: true
});

router.use(express.static(config.static));
router.use('/api/fixtures', fixtureRoutes);
router.use('*', express.static(config.static));

export default router;
