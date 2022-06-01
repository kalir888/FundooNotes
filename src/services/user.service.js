import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//get all users
/* export const getAllUsers = async () => {
  const data = await User.find();
  return data;
}; */

export const registerUser = async (body) => {
  const resData = await User.findOne({email: body.email});
  if(resData == null) {
    body.password = await bcrypt.hash(body.password, 10);
    const data = await User.create(body);
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
      let token = jwt.sign({ firstName: data.firstName, email: data.email, id: data._id }, process.env.SECRET_KEY);
      return token;
    }else {
      throw new Error("Password not match");
    }
  }
};

/* //create new user
export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
}; */
