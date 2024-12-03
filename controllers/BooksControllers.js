import BooksService from "../services/BooksService.js";

const BooksController = {

    async getAllBooks(req, res) {
        try{
            const books = await BooksService.getBooks()
            res.json(books);
        }catch(err){
            res.status(500).json({message: `Fail to load books ${err}`});
        }
    },

    async updateBook(req, res) {
        const bookId = parseInt(req.params.id);
        const newBook = req.body;

        try{
            const updateBook = await BooksService.updateBook(bookId, newBook);
            res.json({message: "Book updated", book: updateBook});
        }catch(err){
            if(err.message.includes("not found")){
                res.status(404).json({message:  err.message});
            } else {
                res.status(500).json({message: `Fail to update book with id ${bookId}`});
            }

        }
    }
}

export default BooksController;