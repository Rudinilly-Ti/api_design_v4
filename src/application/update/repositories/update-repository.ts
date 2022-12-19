import { Update } from "../entities/update";

export abstract class UpdateRepository {
  abstract findById(updateId: string): Promise<Update | null>;
  abstract findManyByProductId(productId: string): Promise<Update[]>;
  abstract create(update: Update): Promise<void>;
  abstract save(update: Update): Promise<void>;
  abstract delete(updateId: string): Promise<void>;
}
