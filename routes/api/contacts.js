const express = require("express");
const router = express.Router();

const {
  getController,
  getControllerById,
  postController,
  putController,
  deleteController,
} = require("../../controllers/contactsControllers");

const {
  putContactValidation,
  postContactValidation,
} = require("../../middlewares/validationMiddlewares");

router.get("/", getController);
router.get("/:contactId", getControllerById);
router.post("/", postContactValidation, postController);
router.put("/:contactId", putContactValidation, putController);
router.delete("/:contactId", deleteController);

module.exports = router;
