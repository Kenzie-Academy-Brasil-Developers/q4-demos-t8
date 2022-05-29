import { Request, Response } from "express";
import { restaurantService } from "../services";

class RestaurantController {
  createRestaurant = async (req: Request, res: Response) => {
    const restaurant = await restaurantService.createRestaurant(req);
    return res.status(201).json(restaurant);
  };

  getAll = async (_: Request, res: Response) => {
    const restaurants = await restaurantService.getAll();

    return res.status(200).json({ restaurants });
  };
}

export default new RestaurantController();
