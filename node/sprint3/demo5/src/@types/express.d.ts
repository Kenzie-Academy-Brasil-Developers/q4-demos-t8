import { Address, User } from "../entities";
import { TProduct } from '../types';

declare global {
  namespace Express {
    interface Request {
      validated: User | Address | TProduct;
      decoded: User;
    }
  }
}
