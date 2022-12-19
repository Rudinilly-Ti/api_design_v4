import "reflect-metadata";
import express from "express";
import userRouter from "@infra/http/routes/user-routes";
import productRouter from "@infra/http/routes/product-routes";
import morgan from "morgan";
import cors from "cors";
import updateRouter from "@infra/http/routes/update-routes";
import updatePointRouter from "@infra/http/routes/update-point-routes";
import { protect } from "@infra/http/middlewares/protect-routes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/api", protect, productRouter);
app.use("/api", protect, updateRouter);
app.use("/api", protect, updatePointRouter);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default app;
