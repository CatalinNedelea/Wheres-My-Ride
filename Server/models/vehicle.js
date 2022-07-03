const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  numberPlate: { type: String, required: true },
  currentLocation: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    speed: { type: String, required: true },
    altitude: { type: String, required: true },
    datetimev: { type: String, required: true },
  },
  serialNo: { type: String, required: true }, //serialNo of RPi module
  scheduleID: { type: String, required: false },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
