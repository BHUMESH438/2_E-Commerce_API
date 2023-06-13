export const globalErrorHandlers = (err, req, res, next) => {
  const stack = err?.stack;
  const message = err?.message;
  const statusCode = err?.statusCodes ? err?.statusCodes : 500;
  res.status(statusCode).json({
    message,
    statusCode,
    stack
  });
};

//stack will provide at which line of code the error exist in our local server

export const notFound = (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found(404)`);
  next(err);
};
//next returns the error variable
//in this we pass next because the error will flow throught the notfound error and finally it will reach the global error
//if page is not there it will pass down the error
