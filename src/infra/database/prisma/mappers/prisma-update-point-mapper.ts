import { UpdatePoint as RawUpdatePoint } from "@prisma/client";
import { UpdatePoint } from "../../../../application/update-point/entities/update-point";

export class PrismaUpdatePointMapper {
  static toPrisma(updatePoint: UpdatePoint) {
    return {
      id: updatePoint.id,
      name: updatePoint.name,
      description: updatePoint.description,
      updateId: updatePoint.updateId,
      createdAt: updatePoint.createdAt,
      updatedAt: updatePoint.updatedAt,
    };
  }

  static toDomain(raw: RawUpdatePoint) {
    return new UpdatePoint(
      {
        name: raw.name,
        description: raw.description,
        updateId: raw.updateId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );
  }
}
