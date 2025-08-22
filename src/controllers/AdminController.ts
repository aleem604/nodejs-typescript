import { Request, Response, NextFunction } from "express";
import { products } from "./../routes/admin";

export const addProduct = (req: Request, res: Response, next: NextFunction) => {
  res.render("add-product", {
    pageTitle: "Add Product"});
};

export const postAddProduct = (req: Request, res: Response, next: NextFunction) => {
  products.push({ title: req.body.title, price: req.body.price });
  res.redirect("/");
};