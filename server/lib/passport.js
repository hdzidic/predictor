import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import Q from 'q';

import getUserById from '../api/users/db/getUserById';
import getUserByUsername from '../api/users/db/getUserByUsername';
import storeUser from '../api/users/db/storeUser';

function setPassport() {
  passport.serializeUser((userId, done) => {
    done(null, userId);
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
          return done(null, user.id);
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
        if (user && user[0]) {
          throw new Error('Username is already taken');
        }
        return bcrypt.hash(password, 10);
      })
      .then(hashedPass => storeUser({
        username,
        password: hashedPass,
        token: userConfirmationToken,
        fullname: req.body.fullname,
        created_at: new Date(),
      }))
      .then((insertedUser) => {
        done(null, insertedUser[0]);
      })
      .catch((err) => {
        done(null, false, { message: err.message });
      })
      .done();
  }));
  return passport;
}

const passportInstance = setPassport();

export default passportInstance;
