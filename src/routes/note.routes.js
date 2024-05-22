import { allNotes, createNote, deleteNote, updateNote } from "../controllers/note.controllers.js";
import { Router } from "express";
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = Router()

router.route("/createnote").post(verifyJWT, createNote)
router.route("/updatenote/:id").put(verifyJWT, updateNote)
router.route("/deletenote/:id").delete(verifyJWT, deleteNote);
router.route("/allnote").get(verifyJWT, allNotes)



export default router;