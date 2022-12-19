import { UpdatePoint } from "../entities/update-point";

export abstract class UpdatePointRepository {
  abstract findById(updatePointId: string): Promise<UpdatePoint | null>;
  abstract findManyByUpdateId(updateId: string): Promise<UpdatePoint[]>;
  abstract create(updatePoint: UpdatePoint): Promise<void>;
  abstract save(updatePoint: UpdatePoint): Promise<void>;
  abstract delete(updatePointId: string): Promise<void>;
}
