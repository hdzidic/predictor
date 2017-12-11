import { Router } from 'express';
import controller from './controller';

export default Router({ strict: true }).get('/', controller);
