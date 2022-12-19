import { UpdatePoint } from "@application/update-point/entities/update-point";
import { UpdatePointRepository } from "@application/update-point/repositories/update-point-repository";

export class InMemoryUpdatePointRepository implements UpdatePointRepository {
  public updatePoints: UpdatePoint[] = [];

  async findById(updatePointId: string): Promise<UpdatePoint | null> {
    const updatePoint = this.updatePoints.find(
      (item) => item.id === updatePointId
    );

    if (!updatePoint) return null;

    return updatePoint;
  }

  async findManyByUpdateId(updateId: string): Promise<UpdatePoint[]> {
    return this.updatePoints.filter((item) => item.updateId === updateId);
  }

  async create(updatePoint: UpdatePoint): Promise<void> {
    this.updatePoints.push(updatePoint);
  }

  async save(updatePoint: UpdatePoint): Promise<void> {
    const index = this.updatePoints.findIndex(
      (item) => item.id === updatePoint.id
    );
    if (index >= 0) {
      this.updatePoints[index] = updatePoint;
    }
  }

  async delete(updatePointId: string): Promise<void> {
    const index = this.updatePoints.findIndex(
      (item) => item.id === updatePointId
    );

    if (index >= 0) {
      this.updatePoints.splice(index, 1);
    }
  }
}
