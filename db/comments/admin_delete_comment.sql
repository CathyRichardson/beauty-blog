 -- Delete any record if user id is an admin
 DELETE FROM skincare_comment
 WHERE id = $1 
 AND $2 IN
 -- subquery to get all admins
 (SELECT id FROM beauty_user 
 WHERE is_admin = TRUE); 