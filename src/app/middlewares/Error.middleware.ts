import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

const errorMiddleware = (error: HttpException, _: Request, response: Response, __: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response
    .status(status)
    .send({
      status,
      message,
    })
}

export default errorMiddleware;
