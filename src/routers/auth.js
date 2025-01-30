import { Router } from 'express';
import { ctrlWrapper } from './../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/validateAuth.js';
import { regiserController } from '../controllers/auth.js';
