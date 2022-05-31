import express from 'express';
import * as NoteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', NoteController.getAllNotes);

router.post('', newNoteValidator, userAuth, NoteController.createNote);

router.get('/:_id', NoteController.getNote);

router.put('/:_id', NoteController.updateNote);

router.delete('/:_id', NoteController.deleteNote);

export default router;