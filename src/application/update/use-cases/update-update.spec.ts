import { InMemoryUpdateRepository } from "@test/repositories/in-memory-update-repository";
import { makeUpdate } from "@test/factories/update-factory";
import { UPDATE_STATUS } from "../entities/update";
import { UpdateUpdate } from "./update-update";

describe("Update Update Use Case", () => {
  it("should be able to update an update", async () => {
    const updateRepository = new InMemoryUpdateRepository();
    const updateUpdate = new UpdateUpdate(updateRepository);

    const oldUpdate = makeUpdate();

    await updateRepository.create(oldUpdate);

    await updateUpdate.execute({
      updateId: oldUpdate.id,
      status: UPDATE_STATUS.SHIPPED,
      title: "New Title",
      body: "New Body",
      version: "New Version",
      asset: "New Asset",
    });

    expect(updateRepository.updates[0].status).toEqual(UPDATE_STATUS.SHIPPED);
  });

  it("shold not be able to update a non existing update", async () => {
    const updateRepository = new InMemoryUpdateRepository();
    const updateUpdate = new UpdateUpdate(updateRepository);

    expect(() => {
      return updateUpdate.execute({
        updateId: "non-existing-update-id",
        status: UPDATE_STATUS.SHIPPED,
      });
    }).rejects.toThrow();
  });
});
