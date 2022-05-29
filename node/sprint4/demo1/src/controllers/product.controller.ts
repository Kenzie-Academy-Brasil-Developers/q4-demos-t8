import { Request, Response } from "express";
import { productService } from "../services";

class ProductController {
  createProducts = async (req: Request, res: Response) => {
    const products = await productService.createProducts(req);

    return res.status(201).json({ products });
  };
}

export default new ProductController();
