import express from "express";
import path from "path";
import rootDir from '../util/path';
const router = express.Router();

export const products: any[] = [];

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir(), "views", "add-product.html"));
});

router.post("/product", (req, res, next) => {
  products.push({ title: req.body.title });
  console.log(products);
  res.redirect("/");
});



export default router;