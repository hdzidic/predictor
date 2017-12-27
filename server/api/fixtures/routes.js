import { Router } from 'express';
import * as controller from './fixtures';
import authenticate from '../../lib/auth';

export default Router({ strict: true })
  .get('/', authenticate, controller.getFixtures)
  .post('/', authenticate, controller.saveFixtures);
