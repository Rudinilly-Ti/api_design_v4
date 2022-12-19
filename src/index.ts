import * as dotenv from "dotenv";
dotenv.config();
import config from "./infra/config/env";
import app from "./server";

app.listen(config.port, () => {
  console.log(`server listening on port ${config.port}`);
});
