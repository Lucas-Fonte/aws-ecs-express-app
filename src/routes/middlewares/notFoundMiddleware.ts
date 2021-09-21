import { Request, Response, NextFunction } from 'express';

const notFoundMiddleware = (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  const allowedEndpoints = ['/health', '/partners', '/docs'];

  for (const allowedEndpoint of allowedEndpoints) {
    if (request.path.startsWith(allowedEndpoint)) {
      nextFunction();
      return;
    }
  }
  response.redirect('/');
};

export { notFoundMiddleware };
