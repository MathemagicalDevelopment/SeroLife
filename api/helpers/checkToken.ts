import { NextFunction, Request, RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken'
import { AuthorisedRequest } from '../types';

// checkToken checks if token is present, if it is valid and authorised
export const checkToken: RequestHandler = (req: AuthorisedRequest, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  if (!!header) {
    const bearer = header.split(" ");
    const token = bearer[1];
    req.token = token;
    jwt.verify(req.token, process.env.SECRET, (err, tokenData:jwt.JwtPayload) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        if (tokenData && tokenData.userId) {
          // If token is successfully verified, we can continue
          req.userId=tokenData.userId;
          next();
        } else {
          return res.status(401).json({ error: "Unauthorized" });
        }
      }
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

