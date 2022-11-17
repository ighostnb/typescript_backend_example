import express from 'express';
import controller from '../controllers/goods';

const router = express.Router();

router.post('/create/goods', controller.createGoods);
router.get('/get/goods', controller.getGoods);
router.get('/get/all-goods', controller.getAllGoods);
router.delete('/delete/goods', controller.removeGoods);

export = router;