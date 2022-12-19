import { makeProduct } from "@test/factories/product-factory";
import { InMemoryProductRepository } from "@test/repositories/in-memory-product-repository";
import { DeleteProduct } from "./delete-product";

describe("Delete Product Use Case", () => {
  it("should be able to delete a product", async () => {
    const productRepository = new InMemoryProductRepository();
    const deleteProduct = new DeleteProduct(productRepository);

    const product = makeProduct();

    await productRepository.create(product);

    await deleteProduct.execute({ productId: product.id });

    expect(productRepository.products[0]).toBeUndefined();
  });

  it("should not be able to delete a non existing product", async () => {
    const productRepository = new InMemoryProductRepository();
    const deleteProduct = new DeleteProduct(productRepository);

    expect(() => {
      return deleteProduct.execute({
        productId: "non-existing-product",
      });
    }).rejects.toThrow();
  });
});
