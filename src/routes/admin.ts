import express from "express";
import path from "path";
import rootDir from '../util/path';
const router = express.Router();


router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir(), "views", "add-product.html"));
});

router.post("/product", (req, res, next) => {
  console.log(req.body.title);
  res.redirect("/");
});



export default router;