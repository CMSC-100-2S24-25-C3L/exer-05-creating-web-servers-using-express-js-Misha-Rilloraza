import needle from 'needle';

const BASE_URL = 'http://localhost:3000';

// Adding a Book
needle.post(
    `${BASE_URL}/add-book`,
    { bookName: 'The Hobbit', isbn: '978-0-261-10221-7', author: 'J.R.R. Tolkien', yearPublished: 1937 },
    { json: true }, // Ensures JSON is properly sent
    (err, res) => {
        if (err) {
            console.error(err);//Error adding book
        } else {
            console.log(res.body);//Add Book Response
        }
    }
);



//Finding Book by ISBN and Author
needle.get(
    `${BASE_URL}/find-by-isbn-author?isbn=978-0-261-10221-7&author=J.R.R.+Tolkien`,
    (err, res) => {
        if (err) {
            console.error("Error finding book:", err);
        } else {
            console.log("Find by ISBN & Author Response:", res.body);
        }
    }
);


/*
needle.get('http://localhost:3000/', (err, res) => {
    console.log(res.body);
});

needle.post(
    'http://localhost:3000/submit-data',
    //{ name: 'Aj' },
    {name: 'AJ', age: 18, city: 'Laguna' },
    (err, res) => {
        //console.log(res.body);
    }
);
*/