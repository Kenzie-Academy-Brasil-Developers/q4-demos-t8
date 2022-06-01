import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Product } from "../entities";

interface IProductRepo {
  saveMany: (products: Partial<Product[]>) => Promise<Product[]>;
  findOne: (payload: object) => Promise<Product>;
  findAllBy: (payload: object) => Promise<Product[]>;
}

class ProductRepo implements IProductRepo {
  private ormRepo: Repository<Product>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Product);
  }

  saveMany = async (products: Product[]) => {
    const insertedProducts = await this.ormRepo
      .createQueryBuilder()
      .insert()
      .values(products)
      .execute();

    const returnProducts: Product[] = [];

    for (let { productUuid } of insertedProducts.generatedMaps) {
      returnProducts.push(await this.findOne({ productUuid }));
    }

    return returnProducts;
  };

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  findAllBy = async (payload: object) => {
    return await this.ormRepo.findBy({ ...payload });
  };
}

export default new ProductRepo();
