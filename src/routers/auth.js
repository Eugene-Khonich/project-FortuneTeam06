import { Router } from 'express';
import * as authController from '../controllers/auth.js';
import { validateBody } from './../middlewares/validateBody.js';
import { ctrlWrapper } from './../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validation/validateAuth.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(authController.registerController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(authController.loginController),
);
authRouter.post('/logout', ctrlWrapper(authController.logoutUserController));

export default authRouter;
