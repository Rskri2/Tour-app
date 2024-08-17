const AppError = require('../util/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate value: ${value}.Please enter another value`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data, ${errors.join('. ')}`;

  return new AppError(message, 400);
};
const handleJWTExpiredError = () => {

  return new AppError('Your token has expired!Please log in again', 40);
};
const handleJWTError= () => {
  
  return new AppError('Invalid token.Please log in again', 401);
};
const sendErrorDev = (err,req, res) => {
  //app
  if((req.originalUrl).startsWith('/app')){
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  else {
    //rendered website
    res.status(err.statusCode).render('error',{
      title:'Something went wrong!',
      msg:err.message
    })
  }
  
};

const sendErrorProd = (err,req, res) => {
  if(req.originalUrl.startsWith('/app')){
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }  
    console.error('Error', err);
     return  res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
      });
  }
  
    //rendered website
    if (err.isOperational) {
      return res.status(err.statusCode).render('error',{
        title:'Something went wrong!',
        msg:err.message
      })
    }
      return res.status(err.statusCode).render('error',{
        title:'Something went wrong!',
        msg:'Please try again later'
      })
      
    };

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req,res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message
    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()

    sendErrorProd(error,req, res);
  }
};
