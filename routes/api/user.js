const express = require("express");

const ctrl = require("../../controllers/user");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/singup", validateBody(schemas.registerSchema), ctrl.singup);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.patch(
  "/:_id/subscription",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.changeSubscription
);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
