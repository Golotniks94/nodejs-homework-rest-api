<<<<<<< HEAD
const express = require("express");
const contactsController= require("../../controllers/contact-controller.js")
const router = express.Router();
const {validateBody, isValidId}= require('../../decorators')
const schema = require('../../schema/contactsSchema.js');
=======
const express = require('express')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')
const { postSchema, putSchema } = require('../../joi')
>>>>>>> master


<<<<<<< HEAD

router.get("/", contactsController.getAllContacts);

router.get("/:id", isValidId, contactsController.getContactByIdb );

router.post("/", validateBody(schema.contactSchema), contactsController.addContact );

router.put("/:id", isValidId, validateBody(schema.contactSchema), contactsController.updateContact);
=======
router.get('/', (req, res, next) => {
  listContacts()
    .then((data) => res.json(data))
    .catch((err) => console.error(err))
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  getContactById(contactId)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => console.error(err))
})

router.post('/', async (req, res, next) => {
  const body = postSchema.validate(req.body)
  if (body.error) {
    res.status(400).json({ message: 'Missing required name field' })
  } else {
    addContact(body.value)
      .then((data) => {
        res.json(data)
      })
      .catch((err) => console.error(err))
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  removeContact(contactId)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => console.error(err))
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const body = putSchema.validate(req.body)
  if (body.error) {
    res.json({
      status: 'error',
      code: 403,
      message: body.error.message,
    })
  } else {
    updateContact(contactId, body.value)
      .then((data) => {
        res.json(data)
      })
      .catch((err) => console.error(err))
  }
})
>>>>>>> master

router.delete("/:id", isValidId, contactsController.removeContact );

router.patch("/:id/favorite", isValidId, validateBody(schema.updateFavoriteSchema), contactsController.updateFavorite);

module.exports = router;
