const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  stations: [
    {
      name: String,
      schedule: {
        workingDays: [],
        saturday: [],
        sunday: [],
      },
    },
  ],
});

module.exports = mongoose.model("Schedule", scheduleSchema);
