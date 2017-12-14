import express from 'express';

import passport from '../../lib/passport';

const router = express.Router({
  strict: true,
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));
