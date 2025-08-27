import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";
import { Cart } from "../models/cart.model";

export interface ICartEntity {
  id?: number;
  productId: number;
  userId: number;
  quantity: number;
  dateCreated?: Date;
}

export const getProducts = async (req: Request, res: Response) => {

  res.render("shop/product-list", {
    prods: await Product.findAll(),
    pageTitle: "All Products",
    path: "/products",
  });
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   const prodId = req.params.productId;
  const product = await Product.findByPk(+prodId);

  res.render("shop/product-detail", {
    product: product,
    pageTitle: product?.title,
    path: "/products",
  });
};

export const getIndex = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  res.render("shop/index", {
    prods: await Product.findAll(),
    pageTitle: "Shop",
    path: "/",
  });
};

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.findAll();
  const userId = users[0].id;
  const cartProducts = await Cart.findAll({
    where: { userId: userId },
    include: ["product", "user"],
  });

  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    products: cartProducts,
  });
};

export const postCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await User.findAll();
  const userId = users[0].id;
  const prodId = req.body.productId;
  const product = await Product.findByPk(+prodId);

  await Cart.create({
    productId: product.id,
    userId: userId,
    quantity: 1,
  });

  res.redirect("/cart");
};

export const postCartDeleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cartId = req.body.productId;
  await Cart.destroy({ where: { id: cartId }, limit: 1 });

  res.redirect("/cart");
};

export const getOrders = (req: Request, res: Response, next: NextFunction) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

export const getCheckout = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
