const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const coordinatesSchema = new Schema({
    serialNo: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    speed: { type: String, required: true },
    altitude: { type: String, required: true },
    datetimev: { type: String, required: true }
});

module.exports = mongoose.model("Coordinate", coordinatesSchema);
