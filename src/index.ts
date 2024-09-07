import express from "express";
import { envConfig } from "./config/env.config";
import pool from "./config/dbConnection";

const app = express();
const port = envConfig.port;

pool
  .connect()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Database connection error", err);
  });

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
