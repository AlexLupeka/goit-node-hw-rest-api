const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(id) {
  try {
    const contacts = await listContacts();
    const getContact = contacts.find((contact) => contact.id === id);
    if (!getContact) {
      return null;
    }
    return getContact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(id) {
  try {
    const contacts = await listContacts();
    const contactIdx = contacts.findIndex((contact) => contact.id === id);
    if (contactIdx === -1) {
      return null;
    }
    const deleteContact = contacts.splice(contactIdx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deleteContact;
  } catch (error) {
    console.error(error);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: v4(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  } catch (error) {
    console.error(error);
  }
}

const updateContact = async (id, { name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const contactIdx = contacts.findIndex((contact) => contact.id === id);
    if (contactIdx === -1) {
      return null;
    }
    contacts[contactIdx] = { id, name, email, phone };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[contactIdx];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
