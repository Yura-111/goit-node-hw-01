const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, '../project-1/db/contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);
    return contactsList;
  }
  
  async function getContactById(contactId) {
    const contactsList = await listContacts();
    const contact = contactsList.find(contact => contact.id === contactId);
    if (!contact) {
        return null;
    }
    return contact;
  }
  
  async  function removeContact(contactId) {
    const contactsList = await listContacts();
    const findId = contactsList.findIndex(item => item.id === contactId);
    if (findId === -1) {
      return null;
    }
    const deletedContact = contactsList[findId];
    contactsList.splice(findId, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
    return deletedContact;
  }
  
  async function addContact(name, email, phone) {
    const contactsList = await listContacts();

    const backupContact = contactsList.some(contact => contact.name === name);
    if (backupContact) {
        throw new Error(
        `Contact with name ${name} already exist.`
        );
    }
    const newContact = { id: v4(), name, email, phone };
    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  
    return newContact;
  }

  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };
