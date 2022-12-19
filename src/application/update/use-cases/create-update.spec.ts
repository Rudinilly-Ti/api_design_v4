import { InMemoryUpdateRepository } from "@test/repositories/in-memory-update-repository";
import { UPDATE_STATUS } from "../entities/update";
import { CreateUpdate } from "./create-update";

describe("Create Update Use Case", () => {
  it("should be able to create an update", async () => {
    const updateRepository = new InMemoryUpdateRepository();
    const createUpdate = new CreateUpdate(updateRepository);

    const request = {
      title: "Update 1",
      body: "Update 1 body",
      status: UPDATE_STATUS.SHIPPED,
      productId: "product-1",
      version: "1.0.0",
      asset: "https://example.com/asset.zip",
    };

    const { update } = await createUpdate.execute(request);

    expect(updateRepository.updates[0]).toEqual(update);
  });
});
