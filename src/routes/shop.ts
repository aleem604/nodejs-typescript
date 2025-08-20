import express, {Request, Response} from "express";
import { products } from './../routes/admin';
const router = express.Router();


router.get("/", (req: Request, res: Response) => {
  res.render("ejs/index", {
    title: "Shop Home",
    message: "Welcome to the Shop!",
    products : products
  });
});



export default router;