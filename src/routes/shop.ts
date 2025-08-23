import express, {Request, Response} from "express";
import { getAddProduct } from "./../controllers/ProductController";
const router = express.Router();


// router.get("/", (req: Request, res: Response) => {
//   res.render("ejs/index", {
//     title: "Shop Home",
//     message: "Welcome to the Shop!",
//     products : products
//   });
// });

//pug
// router.get("/", (req: Request, res: Response) => {
//   res.render("pug/index", {
//     title: "Shop Home",
//     message: "Welcome to the Shop!",
//     products : products
//   });
// });

//hbs
router.get("/", getAddProduct);


export default router;