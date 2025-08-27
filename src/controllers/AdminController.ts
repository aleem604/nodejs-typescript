import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";


export const getAddProduct = (
  req: Request,
  res: Response
) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

export const postAddProduct = async (
  req: Request,
  res: Response
) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const users = await User.findAll();
  const description = req.body.description;
  const product = { title, imageUrl, description, price: Number(price), userId: users[0].id };
  await Product.create(product);
  res.redirect("/");
};

export const getEditProduct = async (
  req: Request,
  res: Response
) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  const product = await Product.findByPk(+prodId);

  if (!product) {
    return res.redirect("/");
  }
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    product: product,
  });
};

export const postEditProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = +req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  await Product.update({
    title: updatedTitle,
    imageUrl: updatedImageUrl,
    description: updatedDesc,
    price: updatedPrice,
  }, prodId);

  res.redirect("/admin/products");
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const products = await Product.findAll();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};

export const postDeleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const prodId = req.body.productId;
  await Product.destroy({ where: { id: prodId }, limit: 1 });
  res.redirect("/admin/products");
};
