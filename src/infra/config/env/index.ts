import merge from "lodash.merge";
import authConfig from "../auth";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";

let envConfig;

if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 3000,
    secrets: {
      jwt: authConfig.jwt.secret,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
);
