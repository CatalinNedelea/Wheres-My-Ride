const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");

const router = express.Router();

router.get("/:uid", usersController.getUserById);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("phone").isLength({ max: 10 }),
  ],
  usersController.signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(),
  ],
  usersController.login
);

router.put(
  "/:uid",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(),
    check("password").isLength({ min: 6 }),
    check("phone").isLength({ max: 10 }),
  ],
  usersController.updateUserDetails
);

router.put("/deactivate/:uid", usersController.deactivate);

router.delete("/:uid", usersController.deleteUser);

module.exports = router;
