import needle from 'needle';

const BASE_URL = 'http://localhost:3000';

// ADDING A BOOK
needle.post(
    `${BASE_URL}/add-book`,
    //{ bookName: 'Harry Potter and the Philosopher’s Stone', isbn: '978-0-7475-3269-9', author: 'J.K Rowling', yearPublished: 1997 },
    //{ bookName: 'Harry Potter and the Chamber of Secrets', isbn: '0-7475-3849-2', author: 'J.K Rowling', yearPublished: 1998 },
    { bookName: 'The Little Prince', isbn: '978-0156012195', author: 'Antoine Saint-Exupery', yearPublished: 1943 },
    (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log(res.body);
        }
    }
);

//FIND BOOK: AUTHOR AND ISBN
needle.get(
    `${BASE_URL}/find-by-isbn-author?isbn=978-0-7475-3269-9&author=J.K+Rowling`,
    (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log(res.body);
        }
    }
);

/*
//FIND BOOK: AUTHOR
needle.get(
    `${BASE_URL}/find-by-author?author=J.K+Rowling`,
    (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log(res.body);
        }
    }
);
*/