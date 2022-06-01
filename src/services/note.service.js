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
    const data = await Note.findById({_id: id, UserID: UserID});
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