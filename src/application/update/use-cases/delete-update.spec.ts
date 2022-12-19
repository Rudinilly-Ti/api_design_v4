import { makeUpdate } from "@test/factories/update-factory";
import { InMemoryUpdateRepository } from "@test/repositories/in-memory-update-repository";
import { DeleteUpdate } from "./delete-update";

describe("Delete Update Use Case", () => {
  it("should be able to create an update", async () => {
    const updateRepository = new InMemoryUpdateRepository();
    const deleteUpdate = new DeleteUpdate(updateRepository);

    const update = makeUpdate();

    await updateRepository.create(update);

    await deleteUpdate.execute({ updateId: update.id });

    expect(updateRepository.updates[0]).toBeUndefined();
  });

  it("should not be able to update a non existing update", async () => {
    const updateRepository = new InMemoryUpdateRepository();
    const deleteUpdate = new DeleteUpdate(updateRepository);

    expect(() => {
      return deleteUpdate.execute({ updateId: "update-id" });
    }).rejects.toThrow();
  });
});
