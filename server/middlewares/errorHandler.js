module.exports = (err, req, res, next) => {

  const errCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "dev") {
    res
      .status(errCode)
      .json({
        message: err.message || "Something went wrong",
        stack: err.stack,
      });
  } else {
    res
      .status(errCode)
      .json({ message: err.message || `Internal Server Error` });
  }
};
