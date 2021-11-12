DELETE FROM skincare_comment
WHERE id = $1 
AND user_id = $2;