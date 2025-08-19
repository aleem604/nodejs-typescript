import express from "express";
import path from "path";
import { products } from './../routes/admin';
const router = express.Router();

router.get("/", (req, res, next) => {
    console.log(products);
  res.sendFile(path.join(__dirname, "../views", "index.html"));
});



export default router;