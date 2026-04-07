import { Router } from 'express';
import { validateOrder } from '../middlewares/validators';

import createOrder from '../controllers/order';

const router = Router();

router.post('/', validateOrder, createOrder);

export default router;
