const express = require("express");
const Joi = require("joi");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(14).max(14).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ result });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validationResult = contactSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: "missing required name field" });
    }

    const result = await addContact(req.body);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const validationResult = contactSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: "missing fields" });
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ result, message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
