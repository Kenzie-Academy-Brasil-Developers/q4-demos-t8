import { Address, User } from "../entities";

declare global {
  namespace Express {
    interface Request {
      validated: User | Address;
      decoded: User;
    }
  }
}
