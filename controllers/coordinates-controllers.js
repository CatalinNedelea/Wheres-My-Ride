const HttpError = require("../models/http-error");
const Coordinate = require("../models/coordinates");

// let DUMMY_COORDS = [
//   {
//     serialNo: "000000000000000d",
//     latitude: "45° 20.6028' N",
//     longitude: "21° 50.12084' E",
//     speed: "67",
//     altitude: "205.0",
//     datetimev: "21/11/2021 (14:19:25)",
//   },
// ];

//Searches if a specific Serial Number exists

const getCoordsBySerialNo = async (req, res, next) => {
  const serialNumber = req.params.serialNo;
  let coords;
  try {
    coords = await Coordinate.find(
      (coords) => coords.serialNo === serialNumber
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a coordinate",
      500
    );
    return next(error);
  }

  if (!coords) {
    const error = new HttpError(
      "Could not find a coordinate for the provided Serial Number.",
      404
    );
    return next(error);
  }

  res.json({ coords });
};

const createCoordinate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { serialNo, latitude, longitude, speed, altitude, datetimev } =
    req.body;

  const createdCoordinate = new Coordinate({
    serialNo,
    latitude,
    longitude,
    speed,
    altitude,
    datetimev,
  });

  try {
    await createdCoordinate.save();
  } catch (err) {
    const error = new HttpError(
      "Creating a new coordinate entry failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ coordinate: createdCoordinate });
};

const updateCoordinate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { latitude, longitude, speed, altitude, datetimev } = req.body;
  const serialNumber = req.params.serialNo;

  let coords;
  try {
    coords = await Coordinate.find(
      (coords) => coords.serialNo === serialNumber
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  coords.latitude = latitude;
  coords.longitude = longitude;
  coords.speed = speed;
  coords.altitude = altitude;
  coords.datetimev = datetimev;

  try {
    await coords.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update coords.",
      500
    );
    return next(error);
  }

  res.status(200).json({ coords: coords.toObject({ getters: true }) });
};

const deleteCoordinate = async (req, res, next) => {
  const serialNumber = req.params.serialNo;

  let coords;
  try {
    coords = await await Coordinate.find(
      (coords) => coords.serialNo === serialNumber
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete coords.",
      500
    );
    return next(error);
  }

  try {
    await coords.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete coords.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted coordinate." });
};

exports.getCoordsBySerialNo = getCoordsBySerialNo;
exports.createCoordinate = createCoordinate;
exports.updateCoordinate = updateCoordinate;
exports.deleteCoordinate = deleteCoordinate;
