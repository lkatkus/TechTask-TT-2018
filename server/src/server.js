// Dependency imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Setup
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    res.status(200).send('REST API for testing');
});

app.post('/', (req, res) => {
    let message;
    if(req.body.pickedColor){
        message = `Hello, ${req.body.username}! We will contact you via ${req.body.email}. We also like ${req.body.pickedColor}.`;
    }else{
        message = `Hello, ${req.body.username}! We will contact you via ${req.body.email}. Please pick a color and drag'n'drop it on form above`;
    }
        
    setTimeout(() => {
        res.status(200).send(message);
    }, 2000);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});