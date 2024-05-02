import { author } from "../models/Author.js";
import book from "../models/Book.js";

class BookController {

    static async listBooks(req, res) {
        try {
            const listBooks = await book.find({});
            res.status(200).json(listBooks);
        } catch (error) {
            res.status(500).json({ message: error.message + "Fail in list books." });
        }
    }

    static async listBookById(req, res) {
        try {
            const id = req.params.id;
            const bookFound = await book.findById(id);
            res.status(200).json(bookFound);
        } catch (error) {
            res.status(500).json({ message: error.message + "Fail in post book." });
        }
    }

    static async registerBook(req, res) {
        const newBook = req.body;
        try {
            const authorFound = await author.findById(newBook.author);
            const completeBook = { ...newBook, author: { ...authorFound._doc } }
            const bookCreated = await book.create(completeBook);
            res.status(201).json({ message: "Book registered successfully", book: bookCreated });
        } catch (error) {
            res.status(500).json({ message: error.message + "Fail in post book." });
        }
    }

    static async updateBook(req, res) {
        try {
            const id = req.params.id;
            await book.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Book updated." });
        } catch (error) {
            res.status(500).json({ message: error.message + "Fail in update book." });
        }
    }

    static async deleteBook(req, res) {
        try {
            const id = req.params.id;
            await book.findByIdAndDelete(id);
            res.status(200).json({ message: "Book deleted." });
        } catch (error) {
            res.status(500).json({ message: error.message + "Fail in delete book." });
        }
    }

    static async findBookByPublisher(req,res) {
        const publisher = req.query.publisher
        try {
            const booksByPublisher = await book.find({ publisher: publisher });
            res.status(200).json(booksByPublisher)
        } catch (error) {
            res.status(500).json({ message: error.message + "Fail in list books by publisher." });
        }
    }
}

export default BookController;