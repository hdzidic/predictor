import express from 'express';

import * as users from './users';

const router = express.Router({
  strict: true,
});

router.route('/login').post(users.login);
router.route('/signup').post(users.signUp);

export default router;
