import allowedOriginArrays from "./allowedOriginArray.js";

function validateOrigin(req, res, next) {
  const incomingOriginValue = req.headers.origin;

  if (allowedOriginArrays.includes(incomingOriginValue)) {
    next();
  } else {
    console.log("invalid origin", incomingOriginValue);
    res.status(400).json({ invalidJWT: "Invalid origin" });
  }
}

export default validateOrigin;
