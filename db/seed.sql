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
'DERMA E Vitamin C Serum', 'Vitamin C Serum', 19.99, '2 fl. oz.','A good basic vitamin C serum', true),

('https://www.vichyusa.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-acd-vichy-master-catalog/default/dw889a10f7/product/Mineral-89-Hyaluronic-Acid-Moisturizer-50ml-Vichy-PDP-3337875543248.jpg?sw=565&sh=400&sm=fit&q=70', 
'Vichy Minéral 89 Face Serum', 'Hydrating Serum', 29.50, '1.7 fl. oz.', 'A nice and hydrating hyaluronic acid serum', true),

('https://www.paulaschoice.com/dw/image/v2/BBNX_PRD/on/demandware.static/-/Sites-pc-catalog/default/dwf0fd0988/images/products/skin-perfecting-2-percent-bha-liquid-2010-L.png?sw=360&sfrm=png',
'Paula''s Choice 2% BHA Liquid Exfoliant', 'Exfoilator', 29.50, '4 fl. oz.','A good Salicylic Acid (BHA) exfoliator', true),

('https://differin.com/sites/default/files/images/product/differin-gel-asset-1%402x-gel.png',
'Differin Gel', 'Retinoid', 12.89, '0.5 fl. oz.','Adapalene 0.1% gel, an OTC retinoid that helps with acne', true),

('https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/americas/us/products-v4/moisturizing-cream/cerave_moisturizing_cream_16oz_jar_front-700x875-v3.jpg?rev=9a4aae1dc0f24b42860224d26fccf90f?w=500&hash=E5099501099A14AF10A785F5DA659E5A',
'CeraVe Moisturizing Cream', 'Facial Moisturizer', 14.99, '16 fl. oz.','Very moisturizing cream with ceramides', true),

('https://target.scene7.com/is/image/Target/GUEST_cecc633a-d524-47c4-8376-373323ac50f6?fmt=webp&wid=1400&qlt=80',
'Acure Seriously Soothing Blue Tansy Night Oil', 'Facial Oil', 12.99, '1 fl. oz.','Very hydrating and healing facial oil', true),

('https://cdn.shopify.com/s/files/1/0251/2184/9419/products/face-original_720x.png?v=1588194055',
'Colorescience Sunforgettable Total Protection Face Shield', 'Facial SPF', 39.00, '1 fl. oz.','Hydrating SPF with a tint that is good for fair skin', true),

('https://www.aquaphorus.com/wp-content/uploads/2016/06/healing-1_75_ver_2.jpg',
'Aquaphor Healing Ointment', 'Lip Product', 4.49, '1.75 fl. oz.','Great basic lip, face, or body ointment', true),

('https://target.scene7.com/is/image/Target/GUEST_9e2a5df1-af9c-4fd8-8619-ae3b4dbbcebb?fmt=webp&wid=1400&qlt=80',
'AmLactin Daily Moisturizing Lotion', 'Body Moisturizer', 12.99, '7.9 fl. oz.','Has 12% lactic acid (AHA) to gently exfoliate the skin', true);



INSERT INTO skincare_comment(user_id, product_id, review, is_recommended)
VALUES (1, 1, 'user-review', true);
