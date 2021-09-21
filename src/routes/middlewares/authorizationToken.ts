import { Request, Response, NextFunction } from 'express';

const authorizationToken = (
  request: Request,
  response: Response,
  nextFunction: NextFunction
) => {
  const authorization = request.headers['authorization'];

  if (authorization !== process.env.AUTHORIZATION_TOKEN) {
    return response
      .status(403)
      .json({ message: 'Invalid Authorization token' });
  }

  nextFunction();
};

export { authorizationToken };
