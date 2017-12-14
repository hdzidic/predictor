import { Router } from 'express';
import controller from './fixtures';

export default Router({ strict: true }).get('/', controller);
