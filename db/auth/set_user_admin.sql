UPDATE beauty_user 
SET is_admin = $3
WHERE id = $1 
AND $2 IN
 -- subquery to get all admins
 (SELECT id FROM beauty_user 
 WHERE is_admin = TRUE); 