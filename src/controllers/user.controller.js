import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

export const registerUser = async (req, res, next) => {
  try {
    const data = await UserService.registerUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User registered succesfully'
    });
  }catch(error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const data = await UserService.userLogin(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Login successfully'
    });
  }catch(error) {
   res.status(HttpStatus.BAD_REQUEST).json({
     code: HttpStatus.BAD_REQUEST,
     message: `${error}`
   });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    await UserService.forgotPassword(req.body.email);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'The reset password link is sent to your mail successfully'
    });
  }catch(error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const data = await UserService.resetPassword(req.body.password, req.body.UserID);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'The password changed successfully'
    });
  }catch(error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
}