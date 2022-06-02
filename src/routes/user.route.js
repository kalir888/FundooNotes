import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/validator';

const router = express.Router();

//route to get all users
/* router.get('', userController.getAllUsers); */

//route to user registered
router.post('/signup', newUserValidator, userController.registerUser);

//route to user login
router.post('/login', userController.userLogin);



 /* //route to create a new user
router.post('', newUserValidator, userController.newUser);

//route to get a single user by their user id
router.get('/:_id', userAuth, userController.getUser); */

//route to update a single user by their user id
/* router.put('/:_id', userController.updateUser); */

/* //route to delete a single user by their user id
router.delete('/:_id', userController.deleteUser);  */

export default router;
