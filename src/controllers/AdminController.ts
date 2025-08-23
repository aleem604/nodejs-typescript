import { Request, Response, NextFunction } from "express";
import { Product } from "./../models/product"; 
import { v4 as uuidv4 } from "uuid";

// Generate a new GUID/UUID
const guid: string = uuidv4();

export const addProduct = (req: Request, res: Response, next: NextFunction) => {
  res.render("add-product", {
    pageTitle: "Add Product"});
};

export const postAddProduct = (req: Request, res: Response, next: NextFunction) => {
  const product = new Product(
    req.body.id || guid,
    req.body.title,
    req.body.imageUrl || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    req.body.description || "No description",
    req.body.price || 25.99
  );
  product.save();
  res.redirect("/");
};