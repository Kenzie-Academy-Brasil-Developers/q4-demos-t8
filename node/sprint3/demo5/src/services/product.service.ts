import { Request } from "express";
import { Restaurant } from "../entities";
import { ErrorHandler } from "../errors";
import { productRepository, restaurantRepository } from "../repositories";
import { serializedCreatedProductsSchema } from "../schemas";
import { TProduct } from "../types";

class ProductService {
  createProducts = async ({ validated, params }: Request) => {
    const restaurant: Restaurant = await restaurantRepository.findOne({
      restaurantUuid: params.restaurantUuid,
    });

    if (!(validated as TProduct).products.length) {
      throw new ErrorHandler(400, "Products arrays can not be empty.");
    }

    (validated as TProduct).products.map((p) => (p.restaurant = restaurant));

    const products = await productRepository.saveMany(
      (validated as TProduct).products
    );
    return serializedCreatedProductsSchema.validate(products);
  };
}

export default new ProductService();
