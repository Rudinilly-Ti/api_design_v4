import { Product } from "@application/product/entities/product";
import { ProductRepository } from "@application/product/repositories/product-repository";

export class InMemoryProductRepository implements ProductRepository {
  public products: Product[] = [];

  async findById(productId: string): Promise<Product | null> {
    const product = this.products.find((item) => item.id === productId);

    if (!product) return null;

    return product;
  }

  async findManyByBelongsToId(belongsToId: string): Promise<Product[]> {
    return this.products.filter((item) => item.belongsToId === belongsToId);
  }

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async save(product: Product): Promise<void> {
    const index = this.products.findIndex((item) => {
      item.id === product.id;
    });

    if (index >= 0) {
      this.products[index] = product;
    }
  }

  async delete(productId: string): Promise<void> {
    const index = this.products.findIndex((item) => item.id === productId);

    if (index >= 0) {
      this.products.splice(index, 1);
    }
  }
}
