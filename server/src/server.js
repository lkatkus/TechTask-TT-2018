// Dependency imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Setup
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

let totalRequests = 0;

app.post('/', (req, res) => {
    totalRequests++;
    let message = `Hello, ${req.body.username}! We will contact you via ${req.body.email}. BTW. We also like ${req.body.pickedColor}. There were ${totalRequests} total requests.`
        
    setTimeout(() => {
        res.status(200).send(message);
    }, 2000);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});