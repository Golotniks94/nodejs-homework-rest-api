const { Contact, validationContact, validationFavorite } = require('./contact')
const { User } = require('./user')
const {
  validationRegistrationUser,
  validationLoginUser,
  validationSubscription,
  validationEmailUser,
} = require('./userValidation')

module.exports = {
  Contact,
  validationContact,
  validationFavorite,
  User,
  validationRegistrationUser,
  validationLoginUser,
  validationSubscription,
  validationEmailUser,
}
