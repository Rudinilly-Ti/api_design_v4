import { InMemoryUpdateRepository } from "@test/repositories/in-memory-update-repository";
import { makeUpdate } from "@test/factories/update-factory";
import { GetProductUpdates } from "./get-product-updates";

describe("Get Product Updates Use Case", () => {
  it("should be able return product updates", async () => {
    const updateRepository = new InMemoryUpdateRepository();
    const getProductUpdates = new GetProductUpdates(updateRepository);

    await updateRepository.create(makeUpdate({ productId: "product-id" }));
    await updateRepository.create(makeUpdate({ productId: "product-id" }));
    await updateRepository.create(makeUpdate({ productId: "other-id" }));

    const { updates } = await getProductUpdates.execute({
      productId: "product-id",
    });

    expect(updates).toHaveLength(2);
  });
});
