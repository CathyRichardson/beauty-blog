require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { getAllProducts, getProduct, getProductsRecommended, updateProduct, deleteProduct, addProduct, adminDeleteProductComments }
    = require('./controller/skincareProduct');
const { getComments, addComment, deleteComment, adminDeleteComment } = require('./controller/skincareComment');
const { register, login, logout, getUser, setUserAdmin, usersOnly, adminsOnly } = require('./controller/auth');


const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;
const app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 90,    //90 days. 1000 milliseconds * 60sec * 60min * 24hrs * 90days
    }
}))

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


//authorization endpoints
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.post('/api/auth/logout', logout);
app.get('/api/auth/user', getUser);
app.put('/api/auth/user/:id', usersOnly, adminsOnly, setUserAdmin);

//skincare comment endpoints
app.get('/api/skincare/comments/:id', getComments);
app.post('/api/skincare/comments', usersOnly, addComment);
app.delete('/api/skincare/comments/:id', usersOnly, deleteComment);
app.delete('/api/skincare/comments/:id/admin', usersOnly, adminsOnly, adminDeleteComment);

//skincare product endpoints
app.post('/api/skincare/products', usersOnly, adminsOnly, addProduct);
app.put('/api/skincare/products/:id', usersOnly, adminsOnly, updateProduct);
app.delete('/api/skincare/products/:id', usersOnly, adminsOnly, adminDeleteProductComments, deleteProduct);
app.get('/api/skincare/products', getAllProducts);
app.get('/api/skincare/products/:id', getProduct);
app.get('/api/skincare/products/all/recommended', getProductsRecommended);

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));
