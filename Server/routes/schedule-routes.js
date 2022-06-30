const express = require("express");
const { check } = require("express-validator");

const schedulesControllers = require("../controllers/schedules-controllers");

const router = express.Router();

router.get("/:sid", schedulesControllers.getScheduleById);

router.get("/", schedulesControllers.getSchedules);

router.post("/", schedulesControllers.createSchedule);

module.exports = router;
