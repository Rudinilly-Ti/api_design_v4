import { InMemoryProductRepository } from "@test/repositories/in-memory-product-repository";
import { CreateProduct } from "./create-product";

describe("Create Product Use Case", () => {
  it("should be able to create a product", async () => {
    const productRepository = new InMemoryProductRepository();
    const createProduct = new CreateProduct(productRepository);

    const request = {
      name: "New Product",
      belongsToId: "user1",
    };

    const { product } = await createProduct.execute(request);

    expect(productRepository.products[0]).toEqual(product);
  });
});
