CREATE TABLE beauty_user (
    id INTEGER PRIMARY KEY,
    name VARCHAR(150),
    email  VARCHAR(150),
    password TEXT,
    is_admin BOOLEAN
); 

CREATE TABLE skincare_product (
    id INTEGER PRIMARY KEY,
    name VARCHAR(150),
    type  VARCHAR(150),
    price FLOAT,
    review TEXT,
    is_recommended BOOLEAN
); 

CREATE TABLE skincare_comment (
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES beauty_user(id),
    product_id INTEGER REFERENCES skincare_product(id),
    review TEXT,
    is_recommended BOOLEAN
); 
