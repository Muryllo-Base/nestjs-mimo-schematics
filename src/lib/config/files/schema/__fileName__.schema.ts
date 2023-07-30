import * as Joi from 'joi';

export const <%= classify(name) %>Schema = Joi.object({
  <%= uppercase(underscore(name)) %>_KEY: Joi.string().required(),
  <%= uppercase(underscore(name)) %>_VERSION: Joi.string().required(),
  // Put your validators here for every variable in .env
});
