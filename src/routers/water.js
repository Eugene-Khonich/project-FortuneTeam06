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
router.post('/', validateBody(addWaterSchema), ctrlWrapper(addWaterController));
router.patch(
  '/:waterId',
  validateBody(updateWaterSchema),
  ctrlWrapper(updateWaterController),
);
router.delete('/:waterId', ctrlWrapper(deleteWaterController));
router.get(
  '/day/:date',
  validateBody(dateSchema),
  ctrlWrapper(getWaterByDateController),
);
router.get(
  '/month/:yearMonth',
  validateBody(monthSchema),
  ctrlWrapper(getMonthWaterController),
);

export default router;
