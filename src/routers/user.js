import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { updateUserSchema } from '../validation/users.js';
import {
  getUserByIdController,
  patchUserController,
  countUsersController,
} from '../controllers/users.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getUserByIdController));

router.patch(
  '/',
  upload.single('photo'),
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

router.get('/count', ctrlWrapper(countUsersController));

export default router;
