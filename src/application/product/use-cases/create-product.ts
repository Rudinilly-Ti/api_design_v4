import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product-repository";

interface CreateProductRequest {
  name: string;
  belongsToId: string;
}

interface CreateProductResponse {
  product: Product;
}

export class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    name,
    belongsToId,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const product = new Product({
      name,
      belongsToId,
    });

    await this.productRepository.create(product);

    return { product };
  }
}
