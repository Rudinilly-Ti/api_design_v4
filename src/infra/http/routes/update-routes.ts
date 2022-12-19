import { Router } from "express";
import { body } from "express-validator";
import { handleInputsErrors } from "../middlewares/handle-input-errors";
import { UpdateController } from "../controllers/update-controllert";

const updateController = new UpdateController();
const updateRouter = Router();

updateRouter.get("/update/:productId", updateController.listUpdates);
updateRouter.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  handleInputsErrors,
  updateController.createUpdate
);
updateRouter.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").optional().isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  body("asset").optional(),
  handleInputsErrors,
  updateController.updateUpdate
);
updateRouter.delete("/update/:id", updateController.deleteUpdate);

export default updateRouter;
