import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product-repository";

interface UpdateProductRequest {
  productId: string;
  name?: string;
}

interface UpdateProductResponse {
  product: Product;
}

export class UpdateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    productId,
    name,
  }: UpdateProductRequest): Promise<UpdateProductResponse> {
    const product = await this.productRepository.findById(productId);

    if (!product) throw new Error("Product Not Found");

    product.name = name ?? product.name;

    await this.productRepository.save(product);

    return { product };
  }
}
