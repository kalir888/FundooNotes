import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as mailSender from '../utils/mail.sender'; 
import { server } from '../utils/rabbitmq';

export const registerUser = async (body) => {
  const resData = await User.findOne({email: body.email});
  if(resData == null) {
    body.password = await bcrypt.hash(body.password, 10);
    const data = await User.create(body);
    server(data);
    return data;
  }else {
    throw new Error("User already exist");
  }
};

export const userLogin = async (userData) => {
  const data = await User.findOne({email: userData.email});
  if(data == null) {
    throw new Error("User does not exist");
  }else {
    let passwordCheck = await bcrypt.compare(userData.password, data.password);
    if(passwordCheck) {
      let token = jwt.sign({firstName: data.firstName, email: data.email, id: data._id}, process.env.SECRET_KEY);
      return token;
    }else {
      throw new Error("Password not match");
    }
  }
};

export const forgotPassword = async (userData) => {
  const data = await User.findOne({email: userData});
  console.log('Email: ', data);
  if(data == null) {
    throw new Error("User does not exist");
  }else {
    let token = jwt.sign({firstName: data.firstName, email: data.email, id: data._id}, process.env.SECRET_KEY2);
    let message = await mailSender.sendEmail(data.email, token);
    console.log('message: ', message);
    return message;
  }
};

export const resetPassword = async (pass,mail) => {
  let hashedPass = await bcrypt.hash(pass, 10);
  const data = await User.findOneAndUpdate({email: mail}, {password: hashedPass});
  return data;
}
