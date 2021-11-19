INSERT INTO skincare_product(image, name, type, price, size, review, is_recommended)
VALUES ( $1, $2, $3, $4, $5, $6, $7)
RETURNING id;