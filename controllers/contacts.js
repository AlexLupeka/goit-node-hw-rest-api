const { Contact } = require("../models/contacts");

const { httpError, asyncWrapper } = require("../helpers");

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = true && false } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: _id, favorite }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "name email");
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.status(201).json(result);
};

const changeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json({ result, message: "contact deleted" });
};

module.exports = {
  getContacts: asyncWrapper(getContacts),
  getContactById: asyncWrapper(getContactById),
  addContact: asyncWrapper(addContact),
  changeContact: asyncWrapper(changeContact),
  updateStatusContact: asyncWrapper(updateStatusContact),
  deleteContactById: asyncWrapper(deleteContactById),
};
