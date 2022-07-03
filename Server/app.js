const express = require("express");
const mongoose = require("mongoose");
const vehiclesRoutes = require("./routes/vehicle-routes");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const scheduleRoutes = require("./routes/schedule-routes");
const HttpError = require("./models/http-error");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/vehicles", vehiclesRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/schedule", scheduleRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://Admin:kMjzU6BuqDhjrMt@cluster0.elyd8.mongodb.net/Where's_My_Ride?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
