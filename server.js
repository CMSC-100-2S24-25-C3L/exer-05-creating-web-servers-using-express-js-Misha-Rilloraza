import express from 'express';
import fs from 'fs';
//RESOURCES:
//https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/

//instantiate the server
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const BOOKS_FILE = 'books.txt';

//POST method: addBooks
//add books to books.txt
//route name: /add-book
//accepts an obj in the req body.
//obj fields: bookName, isbn (unique), author, yearPublished
//if all fields exists and not empty strings then save to books.txt
//format: bookName, isbn (unique), author, yearPublished
// ADD BOOK - POST METHOD
app.post('/add-book', (req, res) => {
    const { bookName, isbn, author, yearPublished } = req.body; 

    // if values are not complete
    if (!bookName || !isbn || !author || !yearPublished) {
        return res.send({ success: false});
    }

    //else if all values are present then...
    try {
        const books = fs.existsSync(BOOKS_FILE) ? fs.readFileSync(BOOKS_FILE, 'utf8').trim().split('\n') : [];

        // Check for duplicate ISBN using a for loop
        let duplicate = false;
        for (let i = 0; i < books.length; i++) {
            const bookDetails = books[i].split(','); //split each details by ,
            const existingIsbn = bookDetails[1]; //then get isbn

            if (existingIsbn === isbn) { //if isbn exists, stop
                duplicate = true;
                break; 
            }
        }

        if (duplicate) {
            return res.send({ success: false });
        }

        //append to books.txt
        const newBook = `${bookName},${isbn},${author},${yearPublished}\n`;
        fs.appendFileSync(BOOKS_FILE, newBook);

        return res.send({ success: true });

    } catch (error) {
        console.error(error);
        return res.send({ success: false });
    }
});

// GET METHOD - ISBN and Author 
//retrieve all book details
//find-by-isbn-author as the route name
//2 parameters in the address bar
app.get('/find-by-isbn-author', (req, res) => {
    const { isbn, author } = req.query;

    if (!isbn || !author) { //if isbn or author is empty
        return res.send({ success: false });
    }

    try {
        //read entire information inside books.txt
        const books = fs.readFileSync(BOOKS_FILE, 'utf8').trim().split('\n');

        let bookFound = null; //initially book is not found
        for (let x of books) { //separate book details
            const [bookName, bookIsbn, bookAuthor, yearPublished] = x.split(',');
            
            //if bookIsbn and bookAuthor == to sample in the test.js then return book details
            if (bookIsbn === isbn && bookAuthor === author) {
                bookFound = { bookName, isbn: bookIsbn, author: bookAuthor, yearPublished };
                break; 
            }
        }
        return bookFound? res.send({ success: true, book: bookFound }): res.send({ success: false });

    } catch (error) {
        console.error(error);
        return res.send({ success: false });
    }
});

//GET METHOD - author
// GET METHOD - Find books by author
app.get('/find-by-author', (req, res) => {
    const { author } = req.query;

    //if author is empty
    if (!author) {
        return res.send({ success: false });
    }

    //else if author is present then...
    try {
        //read entire information inside books.txt
        if (!fs.existsSync(BOOKS_FILE)) {
            return res.send({ success: false });
        }

        const books = fs.readFileSync(BOOKS_FILE, 'utf8').trim().split('\n');
        let booksByAuthor = []; //empty list for other books the author made

        for (let x of books) {
            const [bookName, bookIsbn, bookAuthor, yearPublished] = x.split(',');

            
            //add matched book to the other books the author made
            if (bookAuthor === author) {
                booksByAuthor = booksByAuthor.concat({ bookName, isbn: bookIsbn, author: bookAuthor, yearPublished });
            }
            
        }
        //return the books the author made (if there is one) 
        return booksByAuthor.length > 0? res.send({ success: true, books: booksByAuthor }): res.send({ success: false});

    } catch (error) {
        console.error(error);
        return res.send({ success: false});
    }
});


app.listen(3000, () => {
    console.log('Server started at port 3000');
});