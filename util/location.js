const axios = require("axios");

const HttpError = require("../models/http-error");

const { response } = require("express");

const API_KEY = "AIzaSyCf_XSFv4rJgBX9nXRczGe0WsRxD7dmxpw";

async function getCoordsForAdress(address) {
  axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );
  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }
}
