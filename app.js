const express = require("express");
const app = express();

// Import repository
const BookRepository = require("./repository/BookRepository");

app.get("/", async (req, res) => {
    let book = await BookRepository.getBookById(1);
    let title = await BookRepository.getBookByTitle("Sci-fi");
    res.send("Hello World! Book: " + book.genre+ " Title: " +title);
});

app.listen(3000, () => {
    console.log("Listening on port 3000!");
});