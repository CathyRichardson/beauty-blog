CREATE TABLE beauty_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL
); 

CREATE TABLE skincare_product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    type  VARCHAR(150) NOT NULL,
    price FLOAT,
    review TEXT,
    is_recommended BOOLEAN
); 

CREATE TABLE skincare_comment (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES beauty_user(id),
    product_id INTEGER REFERENCES skincare_product(id),
    review TEXT,
    is_recommended BOOLEAN
); 

INSERT INTO beauty_user(name, email, password, is_admin)
VALUES ('Test', 'test@test.com', 'test-password', false);

INSERT INTO skincare_product(name, type, price, review, is_recommended)
VALUES ('Test-product', 'test-type', 45.01, 'test-review', false);

INSERT INTO skincare_comment(user_id, product_id, review, is_recommended)
VALUES (1, 1, 'user-review', true);