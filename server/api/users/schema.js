import Joi from 'joi';

export default {
  signUp: {
    body: Joi.object().required().keys({
      username: Joi.string().email().required(),
      fullname: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  signIn: {
    body: Joi.object().required().keys({
      username: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
};
