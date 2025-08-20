import express, {Request, Response} from "express";
import { products } from './../routes/admin';
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
router.get("/", (req: Request, res: Response) => {
  res.render("index", {
    title: "Shop",
    message: "Welcome to the Shop!",
    products : products,
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
});


export default router;