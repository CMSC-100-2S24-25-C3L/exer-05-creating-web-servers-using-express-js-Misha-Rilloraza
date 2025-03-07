import express from 'express';
import fs from 'fs';

//instantiate the server
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//POST method: addBooks
//add books to books.txt
//route name: /add-book
//accepts an obj in the req body.
//obj fields: bookName, isbn (unique), author, yearPublished
//if all fields exists and not empty strings then save to books.txt
//format: bookName, isbn (unique), author, yearPublished

// ADD BOOKS POST METHOD
app.post('/add-book', (req, res) => {
    const { bookName, isbn, author, yearPublished } = req.body; //obj fields

    /*
    // Validate inputs
    if (!bookName || !isbn || !author || !yearPublished) {
        return res.send({ success: false, message: "FIELDS ARE NOT COMPLETE!" });
    }
    */

    // Validate inputs
    if (bookName && isbn && author && yearPublished !== "") { 
        
        // add function to check for duplicate ISBN
    

        let data = `${bookName},${isbn},${author},${yearPublished}\n`;

        //append to books.txt
        try {
            fs.appendFileSync(BOOKS_FILE, data);
            return res.send({ success: true}); //book added successfully
        } catch (error) {
            console.error("Error writing to file:", error);
            return res.send({ success: false});//failed to save book
        }
    } else {
        return res.send({ success: false}); //fields are not complete
    }

});

//



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