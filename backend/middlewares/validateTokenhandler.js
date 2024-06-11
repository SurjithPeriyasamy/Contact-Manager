const jwt = require("jsonwebtoken");
const { getError } = require("../constants");

const validateToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(getError("user is not authorized or token missing", 401));
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return next(getError("user is not authorized " + err.message, 401));
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(getError(error.message, 500));
  }
  //   let token;
  //   let authHeader = req.headers.Authorization || req.headers.authorization;
  //   if (authHeader && authHeader.startsWith("Bearer")) {
  //     token = authHeader.split(" ")[1];
  //     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
  //       if (err) {
  //         return next(getError("user is not authorized", 401));
  //       }
  //       console.log(decoded);
  //       req.user = decoded;
  //       next();
  //     });
  //   }
};

module.exports = { validateToken };
