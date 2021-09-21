import { Request, Response, NextFunction } from 'express';

const notFoundMiddleware = (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  const allowedEndpoints = ['/health', '/partners', '/docs'];
  if (!allowedEndpoints.includes(request.path)) response.redirect('/');
  nextFunction();
};

export { notFoundMiddleware };
