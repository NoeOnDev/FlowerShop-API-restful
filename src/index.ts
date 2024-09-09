import express from "express";
import pool from "./config/dbConnection";
import { envConfig } from "./config/env.config";
import { productRouter } from "./catalog/interfaces/routes";
import { orderRouter } from "./orders/interfaces/routes";

const app = express();
const port = envConfig.port;

app.use(express.json());
app.use(productRouter);
app.use(orderRouter);

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
