import { author } from "../models/Author.js";

class AuthorController {

    static async listAuthors(req, res) {
        try {
            const listAuthors = await author.find({});
            res.status(200).json(listAuthors);
        } catch (error) {
            res.status(500).json({ message: error.message + "Fail in list author" });
        }
    }

    static async listAuthorById(req, res) {
        try {
            const id = req.params.id;
            const authorFound = await author.findById(id);
            res.status(200).json(authorFound);
        } catch (error) {
            res.status(500).json({ message: error.message + "Fail in post author." });
        }
    }

    static async registerAuthor(req, res) {
        try {
            const newAuthor = await author.create(req.body);
            res.status(201).json({ message: "Author registered successfully", author: newAuthor });
        } catch (error) {
            res.status(500).json({ message: error.message + "Fail in post author." });
        }
    }

    static async updateAuthor(req, res) {
        try {
            const id = req.params.id;
            await author.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Author updated." });
        } catch (error) {
            res.status(500).json({ message: error.message + "Fail in update author." });
        }
    }

    static async deleteAuthor(req, res) {
        try {
            const id = req.params.id;
            await author.findByIdAndDelete(id);
            res.status(200).json({ message: "Author deleted." });
        } catch (error) {
            res.status(500).json({ message: error.message + "Fail in delete author." });
        }
    }
}

export default AuthorController;