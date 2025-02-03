import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addWaterController,
  deleteWaterController,
  getMonthWaterController,
  getWaterByDateController,
  updateWaterController,
} from '../controllers/water.js';
import {
  addWaterSchema,
  dateSchema,
  monthSchema,
  updateWaterSchema,
} from '../validation/water.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);
router.post('/', ctrlWrapper(addWaterController), validateBody(addWaterSchema));
router.patch(
  '/:waterId',
  ctrlWrapper(updateWaterController),
  validateBody(updateWaterSchema),
);
router.delete('/:waterId', ctrlWrapper(deleteWaterController));
router.get(
  '/day/:date',
  ctrlWrapper(getWaterByDateController),
  validateBody(dateSchema),
);
router.get(
  '/month/:yearMonth',
  ctrlWrapper(getMonthWaterController),
  validateBody(monthSchema),
);

export default router;
