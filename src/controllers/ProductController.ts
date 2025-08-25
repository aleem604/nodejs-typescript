import { Request, Response, NextFunction } from "express";
import Product from "./../models/product";
import { ProductRepository } from "../repositry/mysql/productRepository";
import { CartRepository } from "../repositry/mysql/cartRepository";
import { UserRepository } from "../repositry/mysql/userRepository";

export interface ICartEntity {
  id?: number;
  productId: number;
  userId: number;
  quantity: number;
  dateCreated?: Date;
}

export const getProducts = async (req: Request, res: Response) => {
  const repo = new ProductRepository();

  res.render("shop/product-list", {
    prods: await repo.getAll(),
    pageTitle: "All Products",
    path: "/products",
  });
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const repo = new ProductRepository();

  const prodId = req.params.productId;
  const product = await repo.getById(+prodId);

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
  const repo = new ProductRepository();

  res.render("shop/index", {
    prods: await repo.getAll(),
    pageTitle: "Shop",
    path: "/",
  });
};

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cartRepo = new CartRepository();
  const users = await new UserRepository().findAll();
  const userId = users[0].id;
  const cartProducts = await cartRepo.getCartByUser(userId);

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
  const productRepo = new ProductRepository();
  const users = await new UserRepository().findAll();
  const userId = users[0].id;
  const cartRepo = new CartRepository();
  const prodId = req.body.productId;
  const product = await productRepo.getById(+prodId);

  await cartRepo.addToCart({
    productId: product.id,
    userId: userId,
    quantity: 1,
  } as ICartEntity);

  res.redirect("/cart");
};

export const postCartDeleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cartId = req.body.productId;
  await new CartRepository().removeFromCart(cartId);

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
