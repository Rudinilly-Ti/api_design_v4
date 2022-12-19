import { Product, ProductProps } from "@application/product/entities/product";

type Override = Partial<ProductProps>;

export function makeProduct(override: Override = {}) {
  return new Product({
    name: "New Product",
    belongsToId: "user1",
    ...override,
  });
}
