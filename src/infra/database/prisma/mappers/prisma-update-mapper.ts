import { Update, UPDATE_STATUS } from "@application/update/entities/update";
import {
  Update as RawUpdate,
  UPDATE_STATUS as PrismaUpdateStatus,
} from "@prisma/client";

export class PrismaUpdateMapper {
  static toPrisma(update: Update) {
    return {
      id: update.id,
      title: update.title,
      body: update.body,
      status: PrismaUpdateStatus[update.status],
      asset: update.asset,
      version: update.version,
      productId: update.productId,
      createdAt: update.createdAt,
      updatedAt: update.updatedAt,
    };
  }

  static toDomain(raw: RawUpdate) {
    return new Update(
      {
        title: raw.title,
        body: raw.body,
        status: UPDATE_STATUS[raw.status],
        asset: raw.asset,
        version: raw.version,
        productId: raw.productId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );
  }
}
