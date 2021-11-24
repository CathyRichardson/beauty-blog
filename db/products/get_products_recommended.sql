SELECT c.product_id, p.name AS product_name, c.is_recommended, COUNT(*) as count
FROM skincare_comment c
JOIN skincare_product p ON p.id = c.product_id
GROUP BY p.name, c.product_id, c.is_recommended
ORDER BY p.name, c.product_id, c.is_recommended DESC;
