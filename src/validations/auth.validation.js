const Joi = require("joi");
const { password } = require("./custom.validation");

// TODO: CRIO_TASK_MODULE_AUTH - Define request validation schema for user registration
/**
 * Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 * - "name": string
 */

//  const registerSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().custom((value, helpers) => {
//     // Use your custom validation logic from "src/validations/custom.validation.js"
//     const isValid = password.validatePassword(value);
//     if (!isValid) {
//       return helpers.error('any.custom');
//     }
//     return value;
//   }).required(),
//   name: Joi.string().required(),
// });

const register = {
  // return registerSchema.validate(data);
  // this(body) is because frontend sends the request post in body
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required()
  })
// const register = {
};

/**
 * Check request *body* for fields (all are *required*)
 * - "email" : string and satisyfing email structure
 * - "password": string and satisifes the custom password structure defined in "src/validations/custom.validation.js"
 */
const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required()
  })
};

module.exports = {
  register,
  login,
};
