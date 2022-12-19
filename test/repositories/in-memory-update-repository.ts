import { Update } from "@application/update/entities/update";
import { UpdateRepository } from "@application/update/repositories/update-repository";

export class InMemoryUpdateRepository implements UpdateRepository {
  public updates: Update[] = [];

  async findById(updateId: string): Promise<Update | null> {
    const update = this.updates.find((item) => item.id === updateId);

    if (!update) return null;

    return update;
  }

  async findManyByProductId(productId: string): Promise<Update[]> {
    const updates = this.updates.filter((item) => item.productId === productId);

    return updates;
  }

  async create(update: Update): Promise<void> {
    this.updates.push(update);
  }

  async save(update: Update): Promise<void> {
    const index = this.updates.findIndex((item) => item.id === update.id);

    this.updates[index] = update;
  }

  async delete(updateId: string): Promise<void> {
    const index = this.updates.findIndex((item) => item.id === updateId);

    if (index >= 0) {
      this.updates.splice(index, 1);
    }
  }
}
