import * as jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
const SECRET = process.env.SECRET

export const generateToken = (userId: Types.ObjectId) => jwt.sign(
  {
    userId
  },
  SECRET,
  {
    expiresIn: "240h",
  }
);