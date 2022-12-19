import { Router } from "express";
import { body } from "express-validator";
import { ProductController } from "@infra/http/controllers/product-controller";
import { handleInputsErrors } from "../middlewares/handle-input-errors";

const productController = new ProductController();
const productRouter = Router();

productRouter.get("/product", productController.listProducts);
productRouter.post(
  "/product",
  body("name").isString(),
  handleInputsErrors,
  productController.createProduct
);
productRouter.put(
  "/product/:id",
  body("name").isString(),
  handleInputsErrors,
  productController.updateProduct
);

productRouter.delete("/product/:id", productController.deleteProduct);

export default productRouter;
