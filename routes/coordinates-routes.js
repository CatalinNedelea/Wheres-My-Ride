const express = require("express");
const { check } = require("express-validator");

const coordinatesControllers = require("../controllers/coordinates-controllers");

const router = express.Router();

router.get("/:coords", coordinatesControllers.getCoordsBySerialNo);

router.post(
  "/",
  [
    check("serialNo").not().isEmpty(),
    check("latitude").not().isEmpty(),
    check("longitude").not().isEmpty(),
    check("speed").not().isEmpty(),
    check("altitude").not().isEmpty(),
    check("datetimev").not().isEmpty(),
  ],
  coordinatesControllers.createCoordinate
);

router.patch(
  "/:coords",
  [
    check("latitude").not().isEmpty(),
    check("longitude").not().isEmpty(),
    check("speed").not().isEmpty(),
    check("altitude").not().isEmpty(),
    check("datetimev").not().isEmpty(),
  ],
  coordinatesControllers.updateCoordinate
);

router.delete("/:coords", coordinatesControllers.deleteCoordinate);

module.exports = router;
