import express from "express";
import { pool, createTables } from "./config/dbConnection";
import { envConfig } from "./config/env.config";
import { productRouter } from "./catalog/interfaces/routes";
import { orderRouter } from "./orders/interfaces/routes";
import { errorHandler } from "./errors/errorHandler";

const app = express();
const port = envConfig.port;

app.use(express.json());
app.use(productRouter);
app.use(orderRouter);
app.use(errorHandler);

app.get("/", (_req, res) => {
  res.send("Welcome to the API Flower Shop");
});

async function startServer() {
  try {
    await pool.connect();
    console.log("Connected to database");

    await createTables();
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  } catch (err) {
    console.error("Database connection error", err);
    process.exit(1);
  }
}

startServer();
