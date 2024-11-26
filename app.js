import express from 'express';
import fs from 'fs';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Ok")
})

app.put("/books/:bookId", (req, res) => {
    const bookId = parseInt(req.params.bookId)
    const newBookData = req.body;
    console.log(bookId);
    console.log(newBookData);

    fs.readFile('books.json', (err, data) => {
        if (err) {
            return res.status(500).json({message: "Loading books error."});
        }
        let books = JSON.parse(data.toString())
        const bookIndex = books.findIndex( book => book.id === bookId);

        if(bookIndex === -1) {
            return res.status(404).json({message: "Book not found"});
        }

        books[bookIndex] = { ...books[bookIndex], ...newBookData }
        console.log(books);

        fs.writeFile('books.json', JSON.stringify(books, null, 2), (err) => {
            if (err) {
                return res.status(500).json({message: "Error updating book."});
            }
            res.status(200).json({message: "Books updated successfully."});
        })



    })


})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})