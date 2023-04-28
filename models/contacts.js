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
  const foundContactIndex = JSON.parse(contacts).findIndex(
    (contact) => contact.id === contactId
  )

  if (foundContactIndex === -1) {
    return {
      status: 'error',
      code: 404,
      message: 'Contact not found!',
    }
  }

  const newContactsList = JSON.parse(contacts).filter(
    (contact) => contact.id !== contactId
  )

  await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, '\t'))

  return {
    status: 'success',
    code: 200,
    message: 'Contact successfully deleted!',
  }
}

const addContact = async (body) => {
  const contacts = await fs.readFile(contactsPath)
  const foundContacts = JSON.parse(contacts)

  const newId = String(Math.max(...foundContacts.map(({ id }) => +id)) + 1)
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
