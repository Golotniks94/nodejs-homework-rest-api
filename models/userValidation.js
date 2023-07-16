const Joi = require('joi')

const SUBSCRIPTION_TYPES = ['starter', 'pro', 'business']

// registration validation user
const validationRegistrationUser = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .messages({
      'string.pattern.base':
        'Invalid email. Please provide a valid email address',
    })
    .required(),
  subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
})

// login validation user
const validationLoginUser = Joi.object({
  password: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required(),
  subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
})

// validation subscription
const validationSubscription = Joi.object({
  subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
})

module.exports = {
  validationRegistrationUser,
  validationLoginUser,
  validationSubscription,
}
