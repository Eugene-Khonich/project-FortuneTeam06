import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
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

const router = Router();

router.post('/', ctrlWrapper(addWaterController), validateBody(addWaterSchema));
router.patch(
  '/:waterId',
  isValidId,
  ctrlWrapper(updateWaterController),
  validateBody(updateWaterSchema),
);
router.delete('/:waterId', ctrlWrapper(deleteWaterController), isValidId);
router.get(
  '/day/:date',
  ctrlWrapper(getWaterByDateController),
  validateBody(dateSchema),
);
router.get(
  '/month/:month',
  ctrlWrapper(getMonthWaterController),
  validateBody(monthSchema),
);

export default router;
