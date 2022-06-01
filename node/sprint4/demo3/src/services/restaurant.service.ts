import { Request } from "express";
import { Restaurant, User } from "../entities";
import { userRepository } from "../repositories";
import restaurantRepository from "../repositories/restaurant.repository";
import {
  getAllRestaurantsSchema,
  serializedCreatedRestaurant,
} from "../schemas";

class RestaurantService {
  createRestaurant = async ({ validated, decoded }: Request) => {
    const user: User = await userRepository.findOne({
      userUuid: decoded.userUuid,
    });

    const restaurant: Restaurant = await restaurantRepository.save({
      ...validated,
      owner: user,
    });

    return await serializedCreatedRestaurant.validate(restaurant, {
      stripUnknown: true,
    });
  };

  getAll = async () => {
    const restaurants = await restaurantRepository.getAll();

    return await getAllRestaurantsSchema.validate(restaurants, {
      stripUnknown: true,
    });
  };
}

export default new RestaurantService();
