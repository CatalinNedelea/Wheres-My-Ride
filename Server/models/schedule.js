const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    schedule: {
        station: {
          workingDays: { type: [String], required: true },
          saturday: { type: [String], required: true },
          sunday: { type: [String], required: true },
        },
      },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
