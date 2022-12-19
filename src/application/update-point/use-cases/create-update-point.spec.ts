import { InMemoryUpdatePointRepository } from "@test/repositories/in-memory-update-point-repository";
import { CreateUpdatePoint } from "./create-update-point";

describe("Create Update Point Use Case", () => {
  it("should be able to create an update point", async () => {
    const updatePointRepository = new InMemoryUpdatePointRepository();
    const createUpdatePoint = new CreateUpdatePoint(updatePointRepository);

    const request = {
      name: "Update Point Name",
      description: "Update Point Description",
      updateId: "example-id",
    };

    const { updatePoint } = await createUpdatePoint.execute(request);

    expect(updatePointRepository.updatePoints[0]).toEqual(updatePoint);
  });
});
