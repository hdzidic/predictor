import { Router } from 'express';
import controller from './fixtures';
import authenticate from '../../lib/auth';

export default Router({ strict: true }).get('/', authenticate, controller);
