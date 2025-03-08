const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const noteModel = require('../models/Notes');

router.get('/getnotes', fetchuser, async (req, res) => {
    try {
        const notes = await noteModel.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const note = await noteModel.create({
            title,
            description,
            tag,
            user: req.user.id
        });

        res.json(note);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const noteId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ error: "Invalid note ID" });
        }

        let note = await noteModel.findById(noteId);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not Allowed" });
        }

        let newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        note = await noteModel.findByIdAndUpdate(noteId, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const noteId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(noteId)) {
            return res.status(400).json({ error: "Invalid note ID" });
        }

        let note = await noteModel.findById(noteId);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not Allowed" });
        }

        await noteModel.findByIdAndDelete(noteId);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;
