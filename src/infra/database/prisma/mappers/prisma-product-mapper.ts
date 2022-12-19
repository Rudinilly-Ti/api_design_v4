import { Product } from "@application/product/entities/product";
import { Product as RawProduct } from "@prisma/client";

export class PrismaProductMapper {
  static toPrisma(product: Product) {
    return {
      id: product.id,
      name: product.name,
      belongsToId: product.belongsToId,
    };
  }

  static toDomain(product: RawProduct) {
    return new Product(
      {
        name: product.name,
        belongsToId: product.belongsToId,
        createdAt: product.createdAt,
      },
      product.id
    );
  }
}
