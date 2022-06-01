import Note from '../models/notes.model';
import bcrypt from 'bcrypt';

export const getAllNotes = async (UserID) => {
  const data = await Note.find(UserID);
  return data;
};

export const createNote = async (body) => {
      const data = await Note.create(body);
      return data;
};

export const getNote = async (id, UserID) => {
    const data = await Note.findOne({_id: id, UserID: UserID});
    return data;
};

export const updateNote = async (id, body) => {
    const data = await Note.findOneAndUpdate({ _id: id, UserID: body.UserID }, 
      body,{
      new: true
    });
    return data;
};

export const deleteNote = async (id, UserID) => {
    await Note.findByIdAndDelete({_id: id, UserID: UserID});
    return '';
};

export const setIsArchived = async (id, UserID) => {
  const data = await Note.findOne({ _id: id, UserID: UserID});
  const currentStatus = data.isArchived;
  const resData = await Note.findOneAndUpdate({_id: id, UserID: UserID}, {isArchived: !currentStatus});
  return resData;
};

export const setIsDeleted = async (id, UserID) => {
  const data = await Note.findOne({ _id: id, UserID: UserID});
  const currentStatus = data.isDeleted;
  const resData = await Note.findOneAndUpdate({_id: id, UserID: UserID}, {isDeleted: !currentStatus});
  return resData;
};

