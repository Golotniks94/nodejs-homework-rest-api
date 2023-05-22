<<<<<<< HEAD
const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      match: /^[A-ZA][a-za]+ [A-ZA][a-za]+$/,
    },
    email: {
      type: String,
      match: /^\w+((\.|-|_)?\w+)*@\w+((\.|-|_)?\w+)*(\.\w{2,3})+$/,
    },
    phone: {
      type: String,
      match: /^\(\d{3}\)-\d{3}-\d{4}$/,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
const Contact = model("contact", contactSchema);

module.exports = Contact;
=======
const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath)
  return {
    status: 'success',
    code: 200,
    data: JSON.parse(contacts),
  }
}

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(contactsPath)
  const foundContact = JSON.parse(contacts).find(
    (contact) => contact.id === contactId
  )

  if (!foundContact) {
    return {
      status: 'error',
      code: 404,
      message: 'There is no contact with the given ID!',
    }
  }

  return {
    status: 'success',
    code: 200,
    data: foundContact,
  }
}

const removeContact = async (contactId) => {
  const contacts = await fs.readFile(contactsPath)
  const foundContacts = JSON.parse(contacts)

  const foundContactIndex = foundContacts.findIndex(
    (contact) => contact.id === contactId
  )

  if (foundContactIndex === -1) {
    return {
      status: 'error',
      code: 404,
      message: 'Contact not found!',
    }
  }

  foundContacts.splice(foundContactIndex, 1)

  await fs.writeFile(contactsPath, JSON.stringify(foundContacts, null, '\t'))

  return {
    status: 'success',
    code: 200,
    message: 'Contact successfully deleted!',
  }
}

const addContact = async (body) => {
  const contacts = await fs.readFile(contactsPath)
  const foundContacts = JSON.parse(contacts)

  const maxId = foundContacts.reduce((acc, contact) => {
    return Math.max(acc, contact.id)
  }, 0)

  const newId = String(maxId + 1)
  const newContact = { id: newId, ...body }

  const newContactsList = [...foundContacts, newContact]

  await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, '\t'))

  return {
    status: 'success',
    code: 201,
    data: newContact,
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await fs.readFile(contactsPath)
    const foundContacts = JSON.parse(contacts)

    const foundContactIndex = foundContacts.findIndex(
      (contact) => contact.id === contactId
    )

    if (foundContactIndex === -1) {
      return {
        status: 'error',
        code: 404,
        message: 'Contact not found!',
      }
    }

    if (Object.keys(body).length === 0) {
      return {
        status: 'error',
        code: 400,
        message: 'Missing fields',
      }
    }

    const updatedContact = { ...foundContacts[foundContactIndex], ...body }
    foundContacts[foundContactIndex] = updatedContact

    await fs.writeFile(contactsPath, JSON.stringify(foundContacts, null, '\t'))

    return {
      status: 'success',
      code: 200,
      data: updatedContact,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
>>>>>>> master
