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

        //if books.txt exists then read the file (separate each line by ,)
        const books = fs.existsSync(BOOKS_FILE) ? fs.readFileSync(BOOKS_FILE, 'utf8').trim().split('\n') : [];

        //no duplicates
        if (books.some(line => line.split(',')[1] === isbn)) {
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

        let bookFound = null; //initially book is not found yet
        for (let x of books) {
            //separate book details 
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

app.listen(3000, () => {
    console.log('Server started at port 3000');
});



/*
//this tell our app to listen for GET messages on the '/' path
//the callback function specifies what the server will do when 
//a message is received
app.get('/', (req, res) => {
    res.send('<h1>Hello!<h1>');
});

app.get('/greeting', (req, res) => {
    res.send('Hello ' + req.query.name);
});

app.post('/submit-data', (req, res) => {
    console.log(req.body);
    res.send('Received a POST request from ' + req.body.name);
    //const {name, age, city } = req.body;
    //res.send('Received data: Name - ${name}, Age - ${age}, City - ${city}');
});

// this tells our server to listen to the port 3000
// we can also pass an optional callback function to execute 
// after the server starts
app.listen(3000, () => { console.log('Server started at port 3000')});
*/