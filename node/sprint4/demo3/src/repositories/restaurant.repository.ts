import { Repository, UpdateResult } from "typeorm";
import AppDataSource from "../data-source";
import { Restaurant } from "../entities";

interface IRestaurantRepo {
  save: (restaurant: Partial<Restaurant>) => Promise<Restaurant>;
  findOne: (payload: object) => Promise<Restaurant>;
  getAll: () => Promise<Restaurant[]>;
}

class RestaurantRepo implements IRestaurantRepo {
  private ormRepo: Repository<Restaurant>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Restaurant);
  }

  save = async (restaurant: Partial<Restaurant>) => {
    return await this.ormRepo.save(restaurant);
  };

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  getAll = () => this.ormRepo.find();
}

export default new RestaurantRepo();
