const { Schema, model } = require('mongoose')
const { handleMongooseError, patterns } = require('../helpers')
const {
  validationRegistrationUser,
  validationLoginUser,
  validationSubscription,
} = require('../userValidation')

const SUBSCRIPTION_TYPES = ['starter', 'pro', 'business']

// mongoose Schema
const userSchema = new Schema(
  {
    password: {
      type: String,
      validate: [
        {
          validator: (v) => v.length >= 6,
          message: (props) =>
            `Invalid password. Must be at least 6 characters. Got ${props.value.length}`,
        },
      ],
      required: [true, 'The password is required. Set it for user'],
    },
    email: {
      type: String,
      unique: true,
      match: patterns.emailPattern,
      required: [
        true,
        'The email is required. Please provide an email address for user',
      ],
    },
    subscription: {
      type: String,
      default: 'starter',
      validate: {
        validator: function (v) {
          return SUBSCRIPTION_TYPES.includes(v)
        },
        message: (props) =>
          `${
            props.value
          } is not a valid subscription type. Must be: ${SUBSCRIPTION_TYPES.join(
            ', or '
          )}`,
      },
    },
    token: { type: String, default: '' },
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
)

userSchema.post('save', handleMongooseError)
const User = model('user', userSchema)

module.exports = {
  User,
  validationRegistrationUser,
  validationLoginUser,
  validationSubscription,
}
