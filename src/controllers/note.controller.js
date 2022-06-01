import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service.js';

export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All notes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
    try {
      console.log('request : ', req.body);
      const data = await NoteService.createNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note created succesfully'
      });
    }catch(error) {
      next(error);
    }
};

export const getNote = async (req, res, next) => {
    try {
      const data = await NoteService.getNote(req.params._id, req.body.UserId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note fetched successfully'
      });
    } catch (error) {
      next(error);
    }
};

export const updateNote = async (req, res, next) => {
    try {
      const data = await NoteService.updateNote(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Note updated successfully'
      });
    } catch (error) {
      next(error);
    }
};

export const deleteNote = async (req, res, next) => {
    try {
      await NoteService.deleteNote(req.params._id, req.body.UserId);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Note deleted successfully'
      });
    } catch (error) {
      next(error);
    }
};