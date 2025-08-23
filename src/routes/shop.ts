import express, {Request, Response} from "express";
import { getIndex, getProducts, getProduct, getCart, postCart, postCartDeleteProduct, getOrders, getCheckout } from "./../controllers/ProductController";

const router = express.Router();


router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

router.get('/cart', getCart);

router.post('/cart', postCart);

router.post('/cart-delete-item', postCartDeleteProduct);

router.get('/orders', getOrders);

router.get('/checkout', getCheckout);



export default router;