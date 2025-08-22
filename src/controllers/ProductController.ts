import { Request, Response, NextFunction } from "express";
import { products } from "../routes/admin";

export const getAddProduct = (req: Request, res: Response) => {
  res.render("index", {
    title: "Shop (hbs)",
    message: "Welcome to the Shop!",
    products : products,
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
}

