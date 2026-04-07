import { Router } from 'express';
import { getAllProducts, createProduct } from '../controllers/product';
import { validateProduct } from '../middlewares/validators';

const router = Router();

router.get('/', getAllProducts);
router.post('/', validateProduct, createProduct);

export default router;
