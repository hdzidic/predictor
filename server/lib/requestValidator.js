import Joi from 'joi';
import Q from 'q';

function joiValidate(obj, schema) {
  const deferred = Q.defer();
  Joi.validate(obj, schema, (err, data) => {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(data);
    }
  });

  return deferred.promise;
}

export default function validate(request, schema) {
  const promises = [];

  if (schema.query) {
    promises.push(joiValidate(request.query, schema.query));
  }

  if (schema.body) {
    promises.push(joiValidate(request.body, schema.body));
  }

  return Q.all(promises);
}
