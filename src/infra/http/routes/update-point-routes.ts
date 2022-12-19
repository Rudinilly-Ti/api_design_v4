import { Router } from "express";
import { body } from "express-validator";
import { UpdatePointController } from "../controllers/update-point-controller";
import { handleInputsErrors } from "../middlewares/handle-input-errors";

const updatePointController = new UpdatePointController();

const updatePointRouter = Router();

updatePointRouter.get(
  "/updatepoint/:updateId",
  updatePointController.listUpdatePoints
);
updatePointRouter.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").isString(),
  handleInputsErrors,
  updatePointController.createUpdatePoint
);
updatePointRouter.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputsErrors,
  updatePointController.updateUpdatePoint
);
updatePointRouter.delete(
  "/updatepoint/:id",
  updatePointController.deleteUpdatePoint
);

export default updatePointRouter;
