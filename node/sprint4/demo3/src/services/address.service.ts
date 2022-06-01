import { Request } from "express";
import { Address, User } from "../entities";
import { addressRepository, userRepository } from "../repositories";
import { serializedCreateAddressSchema } from "../schemas";

class AddressService {
  createAddress = async ({ validated, decoded }: Request) => {
    const user: User = await userRepository.findOne({
      userUuid: decoded.userUuid,
    });

    const address: Address = await addressRepository.save({
      ...(validated as Address),
      user,
    });

    return await serializedCreateAddressSchema.validate(address, {
      stripUnknown: true,
    });
  };
}

export default new AddressService();
