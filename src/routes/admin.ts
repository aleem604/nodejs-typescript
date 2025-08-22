import express from "express";
import path from "path";
import rootDir from '../util/path';
import { addProduct, postAddProduct } from "./../controllers/AdminController";
const router = express.Router();

export const products: any[] = [];

// router.get("/add-product", (req, res, next) => {
//   res.sendFile(path.join(rootDir(), "views", "add-product.html"));
// });

// router.post("/product", (req, res, next) => {
//   products.push({ title: req.body.title });
//   console.log(products);
//   res.redirect("/");
// });

///ejs
// router.get("/add-product", (req, res, next) => {
//   res.render("ejs/add-product", {
//     pageTitle: "Add Product"});
// });

// router.post("/product", (req, res, next) => {
//   products.push({ title: req.body.title, price: req.body.price });
//   res.redirect("/");
// });

///ejs
// router.get("/add-product", (req, res, next) => {
//   res.render("pug/add-product", {
//     pageTitle: "Add Product"});
// });

// router.post("/product", (req, res, next) => {
//   products.push({ title: req.body.title, price: req.body.price });
//   res.redirect("/");
// });

///hbs
router.get("/add-product", addProduct);

router.post("/add-product", postAddProduct);




export default router;