const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "validation failed",
        message: err.message,
        stack: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.status(statusCode).json({
        title: "Not found",
        message: err.message,
        stack: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "UNAUTHORIZED",
        message: err.message,
        stack: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.status(statusCode).json({
        title: "FORBIDDEN",
        message: err.message,
        stack: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.status(statusCode).json({
        title: "server error",
        message: err.message,
        stack: err.stack,
      });
      break;
    default:
      console.log("No error All good");
      break;
  }
};

module.exports = errorHandler;
