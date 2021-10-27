CREATE TABLE beauty_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL
); 

CREATE TABLE skincare_product (
    id SERIAL PRIMARY KEY,
    image TEXT NOT NULL,
    name VARCHAR(150) NOT NULL,
    type  VARCHAR(150) NOT NULL,
    price FLOAT,
    size VARCHAR(50),
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



INSERT INTO skincare_product(image, name, type, price, size, review, is_recommended)
VALUES 
('https://www.dhccare.com/media/catalog/product/cache/02cccf94ae90183c4f9b773c23a87fc4/d/h/dhc_deep_cleansing_oil_h_300.png', 
'DHC Deep Cleansing Oil', '1st Cleanse/ Makeup Remover', 24.00, '6.7 fl. oz.', 'A good basic cleansing oil', true),

('https://www.vanicream.com/dynamic-media/product/images/vanicream-facial-cleanser-8oz-front-bp20a.jpg?gravity=center&v=galleryZoom&k=6kRgk91BEufhjMU%2BV6bf6A',
'Vanicream Gentle Facial Cleanser', '2nd Cleanse/ AM Face Wash', 8.99, '8 fl. oz.','A good basic cleanser', true),

('https://cdn.shopify.com/s/files/1/1525/1400/products/0365_front_540x.jpg?v=1569333261',
'DERMA E Vitamin C Serum', 'Vitamin C Serum', 19.99, '2 fl. oz.','A good basic vitamin C serum', true);



INSERT INTO skincare_comment(user_id, product_id, review, is_recommended)
VALUES (1, 1, 'user-review', true);
