import { Request, Response, NextFunction } from "express";
import Product from "./../models/product";
import Cart, { CartProduct } from "./../models/cart";

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.fetchAll((products: Product[]) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

export const getProduct = (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product: Product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

export const getIndex = (req: Request, res: Response, next: NextFunction) => {
  Product.fetchAll((products: Product[]) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

export const getCart = (req: Request, res: Response, next: NextFunction) => {
  Cart.getCart((cart: CartProduct) => {
    Product.fetchAll((products: Product[]) => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

export const postCart = (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product: Product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

export const postCartDeleteProduct = (req: Request, res: Response, next: NextFunction) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product: Product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

export const getOrders = (req: Request, res: Response, next: NextFunction) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

export const getCheckout = (req: Request, res: Response, next: NextFunction) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

