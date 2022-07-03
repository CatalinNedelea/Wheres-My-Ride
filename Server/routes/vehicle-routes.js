const express = require("express");
const { check } = require("express-validator");

const vehiclesControllers = require("../controllers/vehicles-controllers");

const router = express.Router();

router.post("/:vid", vehiclesControllers.getVehicleById);

router.get("/:serialNo", vehiclesControllers.getVehiclesBySerialNo);

router.post("/vehicleByName/:name", vehiclesControllers.getVehiclesByName);


router.get("/", vehiclesControllers.getVehicles);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("type").not().isEmpty(),
    check("numberPlate").not().isEmpty(),
    check("description").not().isEmpty(),
    check("serialNo").not().isEmpty(),
  ],
  vehiclesControllers.createVehicle
);

router.put("/:vid", vehiclesControllers.updateVehicle);

router.delete("/:vid", vehiclesControllers.deleteVehicle);

module.exports = router;
