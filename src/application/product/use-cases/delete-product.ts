import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product-repository";

interface DeleteProductRequest {
  productId: string;
}

type DeleteProductResponse = void;

export class DeleteProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
  }: DeleteProductRequest): Promise<DeleteProductResponse> {
    const productExists = await this.productRepository.findById(productId);

    if (!productExists) throw new Error("Product Not Found");

    await this.productRepository.delete(productId);
  }
}
