import express from 'express';
import * as NoteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', userAuth, NoteController.getAllNotes);

router.post('', newNoteValidator, userAuth, NoteController.createNote);

router.get('/:_id', userAuth, NoteController.getNote);

router.put('/:_id', userAuth, NoteController.updateNote);

router.delete('/:_id', userAuth, NoteController.deleteNote);

router.put('/isArchived/:_id', userAuth, NoteController.setIsArchived);

router.put('/isDeleted/:_id', userAuth, NoteController.setIsDeleted);

export default router;