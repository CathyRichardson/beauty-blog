INSERT INTO beauty_user 
(name, email, password, is_admin)
VALUES
($1, $2, $3, $4)
returning *;