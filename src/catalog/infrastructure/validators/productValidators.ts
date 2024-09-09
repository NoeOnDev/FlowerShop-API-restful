import { body, param } from "express-validator";

export const createProductValidator = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("description").notEmpty().withMessage("Product description is required"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("stock").isInt({ min: 0 }).withMessage("Stock cannot be negative"),
  body("category").notEmpty().withMessage("Product category is required"),
];

export const updateProductValidator = [
  param("id").isInt().withMessage("Product ID must be an integer"),
  body("name").notEmpty().withMessage("Product name is required"),
  body("description").notEmpty().withMessage("Product description is required"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("stock").isInt({ min: 0 }).withMessage("Stock cannot be negative"),
  body("category").notEmpty().withMessage("Product category is required"),
];
