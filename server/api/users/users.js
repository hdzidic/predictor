import _ from 'lodash';
import passport from '../../lib/passport';

function authenticate(req, res, next, func) {
  passport.authenticate(func, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return req.logIn(user, (error) => {
        if (error) {
          return next(error);
        }
        return res.status(200).send(_.pick(user, ['id', 'username', 'fullname']));
      });
    }
    if (info && info.message) {
      return (res.status(401).send(info.message));
    }
    return (res.status(401).send('Unknown error'));
  })(req, res, next);
}

export function login(req, res, next) {
  authenticate(req, res, next, 'local');
}

export function signUp(req, res, next) {
  authenticate(req, res, next, 'signup');
}

export function signOut(req, res) {
  req.logout();
  res.redirect('/');
}
