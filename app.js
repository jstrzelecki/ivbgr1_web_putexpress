import express from 'express';
import BooksController from "./controllers/BooksControllers.js";


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send("ok")
})

app.get("/books", BooksController.getAllBooks)
app.put("/books/:id", BooksController.updateBook)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})