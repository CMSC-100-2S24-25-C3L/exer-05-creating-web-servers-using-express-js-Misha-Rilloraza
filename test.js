import needle from 'needle';

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