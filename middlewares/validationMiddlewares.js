const Joi = require("joi");

module.exports = {
  putContactValidation: (req, res, next) => {
    const contactSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string().min(14).max(14).required(),
    });
    const validationResult = contactSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },

  postContactValidation: (req, res, next) => {
    const contactSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string().min(14).max(14).required(),
    });
    const validationResult = contactSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    next();
  },
};
