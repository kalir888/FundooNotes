import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/validator';
import { resetAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', newUserValidator, userController.registerUser);

router.post('/login', userController.userLogin);

router.post('/forgotpassword', userController.forgotPassword);

router.post('/reset', resetAuth, userController.resetPassword);

export default router;
