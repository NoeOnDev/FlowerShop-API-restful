import { body, param } from "express-validator";

export const createOrderValidator = [
  body("productId").notEmpty().withMessage("Product ID is required"),
  body("quantity")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
  body("customerName").notEmpty().withMessage("Customer name is required"),
  body("customerEmail")
    .isEmail()
    .withMessage("Valid customer email is required"),
  body("customerPhone").notEmpty().withMessage("Customer phone is required"),
  body("customerAddress")
    .notEmpty()
    .withMessage("Customer address is required"),
];

export const updateOrderValidator = [
  param("id").isInt().withMessage("Order ID must be an integer"),
  body("productId").notEmpty().withMessage("Product ID is required"),
  body("quantity")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
  body("customerName").notEmpty().withMessage("Customer name is required"),
  body("customerEmail")
    .isEmail()
    .withMessage("Valid customer email is required"),
  body("customerPhone").notEmpty().withMessage("Customer phone is required"),
  body("customerAddress")
    .notEmpty()
    .withMessage("Customer address is required"),
];
