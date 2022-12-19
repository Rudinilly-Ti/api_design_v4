import { Update } from "@application/update/entities/update";
import { UpdateRepository } from "@application/update/repositories/update-repository";
import { PrismaClient } from "@prisma/client";
import { PrismaUpdateMapper } from "../mappers/prisma-update-mapper";

export class UpdatePrismaRepository implements UpdateRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(updateId: string): Promise<Update | null> {
    const update = await this.prisma.update.findUnique({
      where: { id: updateId },
    });

    if (!update) return null;

    return PrismaUpdateMapper.toDomain(update);
  }

  async findManyByProductId(productId: string): Promise<Update[]> {
    const updates = await this.prisma.update.findMany({
      where: { productId },
    });

    return updates.map(PrismaUpdateMapper.toDomain);
  }

  async create(update: Update): Promise<void> {
    const raw = PrismaUpdateMapper.toPrisma(update);

    await this.prisma.update.create({
      data: raw,
    });
  }

  async save(update: Update): Promise<void> {
    const raw = PrismaUpdateMapper.toPrisma(update);

    await this.prisma.update.update({
      where: { id: update.id },
      data: raw,
    });
  }

  async delete(updateId: string): Promise<void> {
    await this.prisma.update.delete({
      where: {
        id: updateId,
      },
    });
  }
}
