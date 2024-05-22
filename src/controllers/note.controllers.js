import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Note } from "../model/notes.model.js";

const createNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        throw new ApiError(400, "Add Title or content")
    }

    const note = new Note({
        title,
        content,
        user: req.user._id
    })

    try {
        const newNote = await note.save();
        res
            .status(201)
            .json(newNote)

    } catch (error) {
        res.
            status(400)
            .json({ message: error.message })
    }

});

const updateNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    try {
        const note = await Note.findOne({ _id: id, user: req.user._id });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        note.title = title;
        note.content = content;

        await note.save();
        res.status(200).json(note);
    } catch (error) {
        throw new ApiError(500, "Failed to update note, please try again");
    }
});


//this is thecontroller to delete a note
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findOneAndDelete({ _id: id, user: req.user._id });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        throw new ApiError(500, "Failed to delete note, please try again");
    }
});


const allNotes = asyncHandler(async (req, res) => {

    try {
        const userId = req.user.id;

        const notes = await Note.find({ user: userId }).populate('user');

        const filteredNotes = notes.map(note => ({
            title: note.title,
            content: note.content
        }));

        res
            .status(200)
            .json(filteredNotes);

    } catch (error) {
        throw new ApiError(500, "Failed to find notes, please try again");
    }
});

export { createNote, updateNote, deleteNote, allNotes }
