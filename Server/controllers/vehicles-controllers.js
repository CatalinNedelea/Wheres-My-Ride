const HttpError = require("../models/http-error");
const Vehicle = require("../models/vehicle");
const { validationResult } = require("express-validator");

//Searches if a specific Serial Number exists

const getVehiclesBySerialNo = async (req, res, next) => {
  const serialNumber = req.params.serialNo;
  let vehicles;
  try {
    vehicles = await Vehicle.find({ serialNo: { $eq: serialNumber } });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find any vehicle entries.",
      500
    );
    return next(error);
  }
  if (!vehicles.length) {
    const error = new HttpError(
      "Could not find a vehicle for the provided Serial Number.",
      404
    );
    return next(error);
  }

  res.json({ vehicles });
};

const getVehiclesByName = async (req, res, next) => {
  const name = req.params.name;
  console.log(name);
  let vehicles;
  try {
    vehicles = await Vehicle.find({ name: { $eq: name } });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find any vehicle entries.",
      500
    );
    return next(error);
  }
  if (!vehicles.length) {
    const error = new HttpError(
      "Could not find a vehicle for the provided Serial Number.",
      404
    );
    return next(error);
  }

  res.json({ vehicles });
};

const getVehicles = async (req, res, next) => {
  let vehicles;
  try {
    vehicles = await Vehicle.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find any vehicle entries.",
      500
    );
    return next(error);
  }
  if (!vehicles.length) {
    const error = new HttpError("Could not find vehicles.", 404);
    return next(error);
  }

  res.json({ vehicles });
};

const getVehicleById = async (req, res, next) => {
  const vehicleId = req.params.vid;
  let vehicle;
  try {
    vehicle = await Vehicle.findById(vehicleId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a vehicle.",
      500
    );
    return next(error);
  }

  if (!vehicle) {
    const error = new HttpError(
      "Could not find a vehicle for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ vehicle });
};

const createVehicle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, type, numberPlate, description, currentLocation, serialNo } =
    req.body;

  const createdVehicle = new Vehicle({
    name,
    type,
    numberPlate,
    description,
    currentLocation,
    serialNo,
  });
  try {
    await createdVehicle.save();
  } catch (err) {
    const error = new HttpError(
      "Creating a new vehicle entry failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ vehicle: createdVehicle });
};

const updateVehicle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { currentLocation } = req.body;
  const vehicleId = req.params.vid;
  let vehicles;
  try {
    vehicles = await Vehicle.findById(vehicleId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update vehicle.",
      500
    );
    return next(error);
  }
  vehicles.currentLocation = currentLocation;
  try {
    await vehicles.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update vehicle.",
      500
    );
    return next(error);
  }

  res.status(200).json({ vehicles: vehicles.toObject({ getters: true }) });
};

const deleteVehicle = async (req, res, next) => {
  const vehicleId = req.params.vid;
  let vehicle;
  try {
    vehicle = await Vehicle.findById(vehicleId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find vehicle.",
      500
    );
    return next(error);
  }

  try {
    await vehicle.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete vehicle.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted vehicle." });
};

exports.getVehiclesBySerialNo = getVehiclesBySerialNo;
exports.getVehicles = getVehicles;
exports.getVehicleById = getVehicleById;
exports.createVehicle = createVehicle;
exports.updateVehicle = updateVehicle;
exports.deleteVehicle = deleteVehicle;
exports.getVehiclesByName = getVehiclesByName;
