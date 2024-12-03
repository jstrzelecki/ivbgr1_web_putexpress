import {promises as fsPromises} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const booksFile= path.resolve(__dirname, "../data/books.json");

const BooksService = {
    async getBooks(encoding = "utf8"){
        try{
            const data = await  fsPromises.readFile(booksFile, encoding);
            return JSON.parse(data || "[]")
        }catch(err){
            console.error("Error loading book: " ,err);
            throw new Error("Error loading book")

        }
    },


    async findBookById(id){
        const books = await this.getBooks();
        const bookIndex = books.findIndex(book => book.id === id);
        if(bookIndex === -1){
            throw new Error(`Book with id ${id} not found`);
        }
        return {book: books[bookIndex], index: bookIndex, books};
    },

    async updateBook(id, newBookData){
        const {book, index, books} = await this.findBookById(id);
        books[index] = {...book, ...newBookData };
        await this.saveBooks(books)

        return books[index];
    },

    async saveBooks(books){
        try{
            const jsonData = JSON.stringify(books, null, 2);
            await fsPromises.writeFile(booksFile, jsonData, "utf8");
        }catch(err){
            throw new Error("Error saving books");
        }
    }
}

export default BooksService;

