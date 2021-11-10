INSERT INTO skincare_comment(user_id, product_id, review, is_recommended)
VALUES ($1, $2, $3, $4)
RETURNING id;