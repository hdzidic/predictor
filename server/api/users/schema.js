import Joi from 'joi';

export default {
  signUp: {
    body: Joi.object().required().keys({
      username: Joi.string().email().required(),
      fullname: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().optional().allow(''),
    }),
  },
  login: {
    body: Joi.object().required().keys({
      username: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
};
