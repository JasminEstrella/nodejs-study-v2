const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//     // res.status(200).send('Hello from the server side');
//     res
//     .status(200)
//     .json({ message: 'Hello from the server side'});
// });

// app.post('/', (req, res) => {
//     res.send('can post on this endpoint')
// })
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        message: "Success",
        results: tours.length,
        data: {
            tours: tours
        }
    })
});

app.post('/api/v1/tours', (req, res) => {
    console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);

    
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "Success",
            data: {
                tour: newTour
            }
        })
    });
});

const port = 8000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
