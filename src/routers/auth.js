import { Router } from 'express';
import * as authController from '../controllers/auth.js';
import { validateBody } from './../middlewares/validateBody.js';
import { ctrlWrapper } from './../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/validateAuth.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(authController.registerController),
);

export default authRouter;
