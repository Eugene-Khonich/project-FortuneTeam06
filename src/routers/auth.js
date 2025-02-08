import { Router } from 'express';
import * as authController from '../controllers/auth.js';
import { validateBody } from './../middlewares/validateBody.js';
import { ctrlWrapper } from './../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
  changePasswordSchema,
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

authRouter.post(
  '/change-password',
  validateBody(changePasswordSchema),
  ctrlWrapper(authController.changePasswordController),
);

export default authRouter;
