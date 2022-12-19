import { Product } from "@application/product/entities/product";
import { ProductRepository } from "@application/product/repositories/product-repository";
import { PrismaClient } from "@prisma/client";
import { PrismaProductMapper } from "../mappers/prisma-product-mapper";

export class ProductPrismaRepository implements ProductRepository {
  constructor(private prisma: PrismaClient) {}
  async findById(productId: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) return null;

    return PrismaProductMapper.toDomain(product);
  }

  async findManyByBelongsToId(belongsToId: string): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        belongsToId,
      },
    });

    return products.map(PrismaProductMapper.toDomain);
  }

  async create(product: Product): Promise<void> {
    const raw = PrismaProductMapper.toPrisma(product);

    await this.prisma.product.create({
      data: raw,
    });
  }

  async save(product: Product): Promise<void> {
    const raw = PrismaProductMapper.toPrisma(product);

    await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        name: raw.name,
      },
    });
  }

  async delete(productId: string): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
