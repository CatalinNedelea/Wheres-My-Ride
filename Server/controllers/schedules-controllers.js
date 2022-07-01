const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Schedule = require("../models/schedule");

const getSchedules = async (req, res, next) => {
  let schedules;
  try {
    schedules = await Schedule.find();
    // console.log(schedules);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find any schedule entries.",
      500
    );
    return next(error);
  }
  if (!schedules.length) {
    const error = new HttpError("Could not find schedules.", 404);
    return next(error);
  }

  res.json({ schedules });
};

const getScheduleById = async (req, res, next) => {
  const scheduleId = req.params.sid;
  let schedule;
  try {
    schedule = await Schedule.findById(scheduleId);
    // console.log(schedule, scheduleId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a schedule",
      500
    );
    return next(error);
  }

  if (!schedule) {
    const error = new HttpError(
      "Could not find a schedule for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ schedule });
};

const createSchedule = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { stations } = req.body;

  const createdSchedule = new Schedule({
    stations,
  });
  try {
    await createdSchedule.save();
  } catch (err) {
    const error = new HttpError(
      "Creating a new schedule entry failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ schedule: createdSchedule });
};

exports.getScheduleById = getScheduleById;
exports.getSchedules = getSchedules;
exports.createSchedule = createSchedule;
