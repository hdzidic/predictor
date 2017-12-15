import express from 'express';

import * as users from './users';
import * as validators from './validators';

const router = express.Router({
  strict: true,
});

router.route('/login').post(validators.login, users.login);
router.route('/signup').post(validators.signUp, users.signUp);

export default router;
