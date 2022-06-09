import Note from '../models/notes.model';
import { client } from '../config/redis';

export const getAllNotes = async (UserID) => {
  const data = await Note.find(UserID);
  if(data) {
    await client.set('allNotes', JSON.stringify(data));
    return data;
  }
};

export const createNote = async (body) => {
      const data = await Note.create(body);
      if(data) {
        await client.del('allNotes'); 
        return data;
      }  
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
    if(data) {
      await client.del('allNotes');
      return data;
    }
};

export const deleteNote = async (id, UserID) => {
    await Note.findByIdAndDelete({_id: id, UserID: UserID});
    await client.del('allNotes');
    
};

export const setIsArchived = async (id, UserID) => {
  const data = await Note.findOne({ _id: id, UserID: UserID});
  const currentStatus = data.isArchived;
  const resData = await Note.findOneAndUpdate({_id: id, UserID: UserID}, {isArchived: !currentStatus});
  if(resData) {
    await client.del('allNotes');
    return resData;
  }
};

export const setIsDeleted = async (id, UserID) => {
  const data = await Note.findOne({ _id: id, UserID: UserID});
  const currentStatus = data.isDeleted;
  const resData = await Note.findOneAndUpdate({_id: id, UserID: UserID}, {isDeleted: !currentStatus});
  if(resData) {
    await client.del('allNotes');
    return resData;
  }
};

