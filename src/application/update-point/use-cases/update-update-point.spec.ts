import { makeUpdatePoint } from "@test/factories/update-point-factory";
import { InMemoryUpdatePointRepository } from "@test/repositories/in-memory-update-point-repository";
import { UpdateUpdatePoint } from "./update-update-point";

describe("Create Update Point Use Case", () => {
  it("should be able to update an update point", async () => {
    const updatePointRepository = new InMemoryUpdatePointRepository();
    const updateUpdatePoint = new UpdateUpdatePoint(updatePointRepository);

    const oldUpdatePoint = makeUpdatePoint();

    await updatePointRepository.create(oldUpdatePoint);

    await updateUpdatePoint.execute({
      id: oldUpdatePoint.id,
      name: "New Name",
      description: "New Description",
    });

    expect(updatePointRepository.updatePoints[0].name).toBe("New Name");
  });

  it("should not be able to update a non existing update point", async () => {
    const updatePointRepository = new InMemoryUpdatePointRepository();
    const updateUpdatePoint = new UpdateUpdatePoint(updatePointRepository);

    const updatePoint = makeUpdatePoint();

    expect(() => {
      return updateUpdatePoint.execute({
        id: updatePoint.id,
      });
    }).rejects.toThrow();
  });
});
