import {Router} from 'express';
import * as controller from './controller';

export default Router({strict: true}).get('/', controller.getFixtures);
