const Joi = require('joi')
const { patterns, templatesMsgJoi } = require('../helpers')

const SUBSCRIPTION_TYPES = ['starter', 'pro', 'business']

// registration validation user
const validationRegistrationUser = Joi.object({
  password: Joi.string().required().messages(templatesMsgJoi('password')),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .messages(templatesMsgJoi('email'))
    .required(),
  subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
})

// login validation user
const validationLoginUser = Joi.object({
  password: Joi.string().required().messages(templatesMsgJoi('password')),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required()
    .messages(templatesMsgJoi('email')),
  subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
})

// validation subscription
const validationSubscription = Joi.object({
  subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
})

// validation email
const validationEmailUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .pattern(patterns.emailPattern)
    .required()
    .messages(templatesMsgJoi('email')),
})

module.exports = {
  validationRegistrationUser,
  validationLoginUser,
  validationSubscription,
  validationEmailUser,
}
