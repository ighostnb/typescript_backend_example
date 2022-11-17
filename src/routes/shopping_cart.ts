import express from 'express';
import controller from '../controllers/shopping_cart';

const router = express.Router();

router.post('/create/cart', controller.createShoppingCart);
router.patch('/update/cart', controller.addToCart);
router.get('/get/cart', controller.getShoppingCart);
router.delete('/delete/cart', controller.removeCart);
router.patch('/delete/cart', controller.removeFromCart);

export = router;