-- Get all comments for a given product
SELECT c.id, c.user_id, u.name as user, c.review, c.is_recommended
FROM skincare_comment c 
JOIN beauty_user u ON c.user_id = u.id
WHERE c.product_id = $1
order by c.id desc;
