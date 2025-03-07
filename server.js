import express from 'express';
import fs from 'fs';

//instantiate the server
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


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