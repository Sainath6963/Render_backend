class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate field: ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Handle JWT Errors
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("Invalid JSON Web Token. Please log in again.", 401);
  }

  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler(
      "Your session has expired. Please log in again.",
      401
    );
  }

  // Handle Mongoose CastError (Invalid ID format, etc.)
  if (err.name === "CastError") {
    err = new ErrorHandler(`Invalid value for ${err.path}`, 400);
  }

  // Format Mongoose Validation Errors
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  // Ensure response is not sent multiple times
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
