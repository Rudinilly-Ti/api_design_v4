import { makeProduct } from "@test/factories/product-factory";
import { InMemoryProductRepository } from "@test/repositories/in-memory-product-repository";
import { UpdateProduct } from "./update-product";

describe("Update Product Use Case", () => {
  it("should be able to update a product", async () => {
    const productRepository = new InMemoryProductRepository();
    const updateProduct = new UpdateProduct(productRepository);

    const toUpdate = makeProduct();

    await productRepository.create(toUpdate);

    await updateProduct.execute({
      productId: toUpdate.id,
      name: "New Name",
    });

    expect(productRepository.products[0].name).toEqual("New Name");
  });

  it("should not be able to update a non existing product", async () => {
    const productRepository = new InMemoryProductRepository();
    const updateProduct = new UpdateProduct(productRepository);

    expect(() => {
      return updateProduct.execute({
        productId: "non-existing-product",
        name: "New Name",
      });
    }).rejects.toThrow();
  });
});
