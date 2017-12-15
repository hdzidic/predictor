import validate from '../../lib/requestValidator';
import schema from './schema';

function validateRequest(req, res, next, reqSchema) {
  return validate(req, reqSchema)
    .then(() => next())
    .catch((err) => {
      res.status(400).send(err);
    })
    .done();
}

export function login(req, res, next) {
  return validateRequest(req, res, next, schema.login);
}

export function signUp(req, res, next) {
  validateRequest(req, res, next, schema.signUp);
}
