 -- Delete all comments for a given product and user id is an admin
 DELETE FROM skincare_comment
 WHERE product_id = $1 
 AND $2 IN
 -- subquery to get all admins
 (SELECT id FROM beauty_user 
 WHERE is_admin = TRUE); 