import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

// Route to create a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Enter all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Gett all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ count: books.length, data: books });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Get one book by id
router.get("//:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Update Route
router.put("//:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Enter all required fields: title, author, publishYear",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});
// Delete Route
router.delete("/book/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;
