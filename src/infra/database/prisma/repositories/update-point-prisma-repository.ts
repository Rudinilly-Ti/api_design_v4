import { PrismaClient } from "@prisma/client";
import { UpdatePoint } from "../../../../application/update-point/entities/update-point";
import { UpdatePointRepository } from "../../../../application/update-point/repositories/update-point-repository";
import { PrismaUpdatePointMapper } from "../mappers/prisma-update-point-mapper";

export class UpdatePointPrismaRepository implements UpdatePointRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(updatePointId: string): Promise<UpdatePoint | null> {
    const updatePoint = await this.prisma.updatePoint.findUnique({
      where: {
        id: updatePointId,
      },
    });

    if (!updatePoint) return null;

    return PrismaUpdatePointMapper.toDomain(updatePoint);
  }

  async findManyByUpdateId(updateId: string): Promise<UpdatePoint[]> {
    const updatePoints = await this.prisma.updatePoint.findMany({
      where: {
        updateId,
      },
    });

    return updatePoints.map((updatePoint) =>
      PrismaUpdatePointMapper.toDomain(updatePoint)
    );
  }

  async create(updatePoint: UpdatePoint): Promise<void> {
    const raw = PrismaUpdatePointMapper.toPrisma(updatePoint);

    await this.prisma.updatePoint.create({
      data: raw,
    });
  }

  async save(updatePoint: UpdatePoint): Promise<void> {
    const raw = PrismaUpdatePointMapper.toPrisma(updatePoint);

    await this.prisma.updatePoint.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async delete(updatePointId: string): Promise<void> {
    await this.prisma.updatePoint.delete({
      where: {
        id: updatePointId,
      },
    });
  }
}
