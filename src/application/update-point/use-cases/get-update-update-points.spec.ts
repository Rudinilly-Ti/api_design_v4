import { makeUpdatePoint } from "@test/factories/update-point-factory";
import { InMemoryUpdatePointRepository } from "@test/repositories/in-memory-update-point-repository";
import { GetUpdateUpdatePoint } from "./get-update-update-points";

describe("Create Update Point Use Case", () => {
  it("should be able to return update update points", async () => {
    const updatePointRepository = new InMemoryUpdatePointRepository();
    const getUpdateUpdatePoints = new GetUpdateUpdatePoint(
      updatePointRepository
    );

    await updatePointRepository.create(
      makeUpdatePoint({
        updateId: "example",
      })
    );
    await updatePointRepository.create(
      makeUpdatePoint({
        updateId: "example",
      })
    );
    await updatePointRepository.create(makeUpdatePoint());

    const { updatePoints } = await getUpdateUpdatePoints.execute({
      updateId: "example",
    });

    expect(updatePoints).toHaveLength(2);
  });
});
