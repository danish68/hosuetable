const ErrorValidator = (err: any, req: any, res: any, next: any) => {
  if (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return res.status(err.statusCode).send({
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  next();
};

export default ErrorValidator;
