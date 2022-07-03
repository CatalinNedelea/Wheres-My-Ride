const SPACE_EXPRESSION = /\s+/;
const LATITUDE_EXPRESSION =
  /^(\d{1,2})°(?:\s*(\d{1,2}[\.]?\d{1,5})[′'])?\s*(N|S|N\/S)$/; // 0- 90° 0-59′ N/S
const LONGITUDE_EXPRESSION =
  /^(\d{1,3})°(?:\s*(\d{1,2}[\.]?\d{1,5})[′'])?\s*(E|W|E\/W)$/; // 0-180° 0-59′ E/W

export const parseCordinate = (expression, limit, surfaces, text) => {
  expression.lastIndex = 0;

  const match = expression.exec(text);
  if (match) {
    const degrees = parseInt(match[1]); // 0-90° or 0-180°
    if (degrees > limit) {
      throw new Error(
        "Incorrect degrees value (should be in range from 0 to " + limit + ")."
      );
    }

    const minutes = parseFloat(match[2] || "0"); // 0-59′
    if (minutes > 59) {
      throw new Error(
        "Incorrect minutes value (should be in range from 0 to 59)."
      );
    }
    if (degrees === 0 && minutes === 0) {
      return 0;
    }

    const surface = match[3]; // N/S or E/W
    if (surface === surfaces[0]) {
      return +(degrees + minutes / 60);
    }
    if (surface === surfaces[1]) {
      return -(degrees + minutes / 60);
    }
    throw new Error(
      "Incorrect surface value (should be " +
        surfaces[0] +
        " or " +
        surfaces[1] +
        ")."
    );
  }

  throw new Error("Incorrect cordinate format.");
};

export const parseLatitude = (latitude) => {
  return parseCordinate(LATITUDE_EXPRESSION, 90, "NS", latitude); // N/S
};

export const parseLongitude = (longitude) => {
  return parseCordinate(LONGITUDE_EXPRESSION, 180, "EW", longitude); // E/W
};

const parsePosition = (position) => {
  if (position) {
    const parts = position.split(SPACE_EXPRESSION);
    if (parts.length === 2) {
      const latitude = parseLatitude(parts[0]);
      const longitude = parseLongitude(parts[1]);
      return { latitude, longitude };
    }
  }
  return new Error("Incorrect position format.");
};
