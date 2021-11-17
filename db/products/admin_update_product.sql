UPDATE skincare_product 
SET image = $3,
    name = $4,
    type = $5,
    price = $6,
    size = $7,
    review = $8,
    is_recommended = $9
WHERE id = $1 
AND $2 IN
 -- subquery to get all admins
 (SELECT id FROM beauty_user 
 WHERE is_admin = TRUE); 