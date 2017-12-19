import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import Q from 'q';
import owasp from 'owasp-password-strength-test';

import config from './config';
import getUserById from '../api/users/db/getUserById';
import getUserByUsername from '../api/users/db/getUserByUsername';
import storeUser from '../api/users/db/storeUser';

owasp.config(config.security.owasp);

function setPassport() {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    getUserById(id)
      .then((user) => {
        done(null, user[0]);
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
        if (!user || !user[0]) {
          throw new Error('User not found');
        } else {
          return user[0];
        }
      })
      .then((userObj) => {
        const promises = [bcrypt.compare(password, userObj.password)];
        promises.push(userObj);

        return Q.all(promises);
      })
      // if password is valid, login user and return user object.
      .then((res) => {
        if (res[0] === false) {
          throw new Error('Incorrect password');
        } else {
          const user = res[1];
          done(null, user);
          return null;
        }
      })
      .catch((err) => {
        done(null, false, { message: err.message });
        return null;
      })
      .done();
  }));

  passport.use('signup', new Strategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    const userConfirmationToken = uuid();
    getUserByUsername(username)
      .then((user) => {
        if (user && user[0]) {
          throw new Error('Username is already taken');
        }
        const result = owasp.test(req.body.password);
        if (!result.strong) {
          throw new Error(result.errors);
        }
        return bcrypt.hash(password, 10);
      })
      .then((hashedPass) => {
        const newUser = {
          username,
          password: hashedPass,
          token: userConfirmationToken,
          fullname: req.body.fullname,
          created_at: new Date(),
        };
        const promises = [newUser, storeUser(newUser)];
        return Q.all(promises);
      })
      .then((results) => {
        const [user, id] = results;
        [user.id] = id;
        done(null, user);
        return null;
      })
      .catch((err) => {
        done(null, false, { message: err.message });
        return null;
      })
      .done();
  }));
  return passport;
}

const passportInstance = setPassport();

export default passportInstance;
