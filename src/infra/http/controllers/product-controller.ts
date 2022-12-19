import { CreateProduct } from "@application/product/use-cases/create-product";
import { DeleteProduct } from "@application/product/use-cases/delete-product";
import { GetUserProducts } from "@application/product/use-cases/get-user-products";
import { UpdateProduct } from "@application/product/use-cases/update-product";
import { PrismaService } from "@infra/database/prisma/prisma-service";
import { ProductPrismaRepository } from "@infra/database/prisma/repositories/product-prisma-repository";
import { Request, Response } from "express";

export class ProductController {
  public async createProduct(req: Request, res: Response): Promise<Response> {
    const createProduct = new CreateProduct(
      new ProductPrismaRepository(new PrismaService())
    );

    const { name } = req.body;

    try {
      const { product } = await createProduct.execute({
        name,
        belongsToId: req.user.id,
      });

      return res.status(201).json({ product });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async listProducts(req: Request, res: Response): Promise<Response> {
    const getProducts = new GetUserProducts(
      new ProductPrismaRepository(new PrismaService())
    );

    try {
      const { products } = await getProducts.execute({
        belongsToId: req.user.id,
      });

      return res.status(200).json({ products });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<Response> {
    const updateProduct = new UpdateProduct(
      new ProductPrismaRepository(new PrismaService())
    );
    const { id } = req.params;
    const { name } = req.body;

    try {
      const { product } = await updateProduct.execute({
        productId: id,
        name,
      });

      return res.status(200).json({ product });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<Response> {
    const deleteProduct = new DeleteProduct(
      new ProductPrismaRepository(new PrismaService())
    );

    const { id } = req.params;

    try {
      await deleteProduct.execute({
        productId: id,
      });

      return res.status(200).json({ message: "Product deleted" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
