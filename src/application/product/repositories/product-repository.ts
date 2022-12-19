import { Product } from "../entities/product";

export abstract class ProductRepository {
  abstract findById(productId: string): Promise<Product | null>;
  abstract findManyByBelongsToId(belongsToId: string): Promise<Product[]>;
  abstract create(product: Product): Promise<void>;
  abstract save(product: Product): Promise<void>;
  abstract delete(productId: string): Promise<void>;
}
