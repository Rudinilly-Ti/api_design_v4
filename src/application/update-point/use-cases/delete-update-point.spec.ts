import { makeUpdatePoint } from "@test/factories/update-point-factory";
import { InMemoryUpdatePointRepository } from "@test/repositories/in-memory-update-point-repository";
import { DeleteUpdatePoint } from "./delete-update-point";

describe("Create Update Point Use Case", () => {
  it("should be able to delete an update point", async () => {
    const updatePointRepository = new InMemoryUpdatePointRepository();
    const deleteUpdatePoint = new DeleteUpdatePoint(updatePointRepository);

    const updatePoint = makeUpdatePoint();

    await updatePointRepository.create(updatePoint);

    await deleteUpdatePoint.execute({ updatePointId: updatePoint.id });

    expect(updatePointRepository.updatePoints[0]).toBeUndefined();
  });

  it("should not be able delete a non existing update point", async () => {
    const updatePointRepository = new InMemoryUpdatePointRepository();
    const deleteUpdatePoint = new DeleteUpdatePoint(updatePointRepository);

    expect(() => {
      return deleteUpdatePoint.execute({
        updatePointId: "non-existing-update-point-id",
      });
    }).rejects.toThrow();
  });
});
