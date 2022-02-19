const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  schedule: {
    station: {
      workingDays: { type: [String], required: true },
      saturday: { type: [String], required: true },
      sunday: { type: [String], required: true },
    },
  },
  GPSId: { type: String, required: true },
  creator: { type: String, required: true },
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
