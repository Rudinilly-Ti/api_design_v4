import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product-repository";

interface GetUserProductsRequest {
  belongsToId: string;
}

interface GetUserProductsResponse {
  products: Product[];
}

export class GetUserProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    belongsToId,
  }: GetUserProductsRequest): Promise<GetUserProductsResponse> {
    const products = await this.productRepository.findManyByBelongsToId(
      belongsToId
    );

    return { products };
  }
}
