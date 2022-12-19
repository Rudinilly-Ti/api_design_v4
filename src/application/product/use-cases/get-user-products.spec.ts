import { makeProduct } from "@test/factories/product-factory";
import { InMemoryProductRepository } from "@test/repositories/in-memory-product-repository";
import { GetUserProducts } from "./get-user-products";

describe("Get User Products Use Case", () => {
  it("should be able to get all user products", async () => {
    const productRepository = new InMemoryProductRepository();
    const getUserProduct = new GetUserProducts(productRepository);

    await productRepository.create(
      makeProduct({
        belongsToId: "user",
      })
    );

    await productRepository.create(
      makeProduct({
        belongsToId: "user",
      })
    );

    await productRepository.create(
      makeProduct({
        belongsToId: "another-user",
      })
    );

    const { products } = await getUserProduct.execute({
      belongsToId: "user",
    });

    expect(products).toHaveLength(2);
  });
});
