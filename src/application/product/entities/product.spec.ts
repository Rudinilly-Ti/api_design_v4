import { makeProduct } from "@test/factories/product-factory";

describe("Product", () => {
  it("should create a product", () => {
    const product = makeProduct();

    expect(product).toBeTruthy();
  });
});
