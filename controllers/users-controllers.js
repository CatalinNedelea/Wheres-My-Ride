const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const user = require("../models/user");
const User = require("../models/user");

const getUserById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a user",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ user });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, email, password, phone } = req.body;
  const status = true;

  const hasUser = await User.find({ email: { $eq: email } });

  if (hasUser.length != 0) {
    const error = new HttpError(
      "Could not create user, email already exists.",
      422
    );
    return next(error);
  }

  const createdUser = new User({ name, email, password, phone, status });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Creating a new user entry failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { email, password } = req.body;

  let identifiedUser;
  try {
    identifiedUser = await User.find({ email: { $eq: email } });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find user.",
      500
    );
    return next(error);
  }
  if (!identifiedUser || identifiedUser[0].password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  res.json({ message: "Logged in!" });
};

const updateUserDetails = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password, phone } = req.body;
  const id = req.params.uid;
  let identifiedUser;
  try {
    identifiedUser = await User.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find user.",
      500
    );
    return next(error);
  }

  identifiedUser.name = name;
  identifiedUser.email = email;
  identifiedUser.password = password;
  identifiedUser.phone = phone;

  try {
    await identifiedUser.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the user account.",
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ identifiedUser: identifiedUser.toObject({ getters: true }) });
};

const deactivate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const id = req.params.uid;
  let identifiedUser;
  try {
    identifiedUser = await User.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find user.",
      500
    );
    return next(error);
  }

  identifiedUser.status = false;
  try {
    await identifiedUser.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not deactivate the user account.",
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ identifiedUser: identifiedUser.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const id = req.params.uid;
  let identifiedUser;
  try {
    identifiedUser = await User.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find user.",
      500
    );
    return next(error);
  }

  identifiedUser.status = false;
  try {
    await identifiedUser.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete the user account.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted account." });
};

exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
exports.deactivate = deactivate;
exports.updateUserDetails = updateUserDetails;
exports.deleteUser = deleteUser;
