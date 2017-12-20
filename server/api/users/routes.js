import express from 'express';

import * as users from './users';
import * as validators from './validators';
import authenticate from '../../lib/auth';

const router = express.Router({
  strict: true,
});

router.route('/login').post(validators.login, users.login);
router.route('/signup').post(validators.signUp, users.signUp);
router.route('/signout').post(authenticate, users.signOut);

export default router;
