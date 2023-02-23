const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getController = async (req, res, next) => {
  const result = await listContacts();
  res.status(200).json({ result });
};

const getControllerById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ result });
};

const postController = async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(201).json({ result });
};

const putController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ result });
};

const deleteController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ result, message: "contact deleted" });
};

module.exports = {
  getController,
  getControllerById,
  postController,
  putController,
  deleteController,
};
