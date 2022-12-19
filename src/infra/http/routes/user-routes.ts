import { Router } from "express";
import { body } from "express-validator";
import { UserController } from "@infra/http/controllers/user-controller";
import { handleInputsErrors } from "../middlewares/handle-input-errors";

const userController = new UserController();

const userRouter = Router();

userRouter.post("/create", userController.createUser);

userRouter.post("/signin", userController.signInUser);

export default userRouter;
