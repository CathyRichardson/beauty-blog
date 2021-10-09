require('dotenv').config();
const express = require('express');
const massive = require('massive');
const { getComments, getAllProducts } = require('./controller/skincare');

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;
const app = express();

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
})
    .then((dbInstance) => {
        app.set('db', dbInstance);
        console.log('db connected');
    })
    .catch(err => {
        console.log('DB setup failed with error', err)
    });


app.get('/api/skincare/comment/:id', getComments);
app.get('/api/skincare/products', getAllProducts);


app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));