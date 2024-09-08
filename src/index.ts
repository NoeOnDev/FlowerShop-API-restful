import express from "express";
import { envConfig } from "./config/env.config";
import pool from "./config/dbConnection";
import { productController } from "./catalog/config/dependencyInjection";

const app = express();
const port = envConfig.port;

app.use(express.json());

app.post("/products", (req, res) => productController.createProduct(req, res));
app.get("/products/:id", (req, res) => productController.findProductById(req, res));

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
