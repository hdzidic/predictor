import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';

import getUserById from '../api/users/db/getUserById';
import getUserByUsername from '../api/users/db/getUserByUsername';
import storeUser from '../api/users/db/storeUser';

function setPassport() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    getUserById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  });

  passport.use('local', new Strategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    getUserByUsername(username)
      .then((user) => {
        if (!user) {
          throw new Error('User not found');
        } else if (!user.isConfirmed) {
          throw new Error('Check your e-mail to complete the registration process.');
        } else {
          return user;
        }
      })
      .then(userObj => bcrypt.compare(password, userObj.password))
      // if password is valid, login user and return user object.
      .then((res) => {
        if (res[0] === false) {
          throw new Error('Incorrect password');
        } else {
          const user = res[1];
          return done(null, user);
        }
      })
      .catch((err) => {
        done(null, false, { message: err.message });
      })
      .done();
  }));

  passport.use('signup', new Strategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    const userConfirmationToken = uuid();
    getUserByUsername(username)
      .then((user) => {
        if (user) {
          throw new Error('Username is already taken');
        }
        return bcrypt.hash(password, 10);
      })
      .then(hashedPass => storeUser({
        username,
        password: hashedPass,
        token: userConfirmationToken,
        fullname: req.body.fullname,
      }))
      .then(insertedUser => done(null, insertedUser))
      .catch((err) => {
        done(null, false, { message: err.message });
      })
      .done();
  }));
  return passport;
}

const passportInstance = setPassport();

export default passportInstance;
