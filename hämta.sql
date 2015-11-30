SELECT   *, 
         product_price :: numeric (8, 2) AS formated_product_price, 
         ( 
                SELECT sum (product_price) AS total_cost0 
                FROM   produkt_v1 
                WHERE  store = 'coop' ) :: numeric (8, 2) AS total_coop, 
         ( 
                SELECT sum (product_price) AS total_cost1 
                FROM   produkt_v1 
                WHERE  store = 'matse' ) :: numeric (8, 2) AS total_matse, 
         ( 
                SELECT sum (product_price) AS total_cost2 
                FROM   produkt_v1 
                WHERE  store = 'ica' ) :: numeric (8, 2) AS total_ica, 
         ( 
                SELECT sum (product_price) AS total_cost3 
                FROM   produkt_v1 
                WHERE  store = 'mathem' ) :: numeric (8, 2) AS total_mathem,
         ( 
                SELECT sum (product_price) AS total_cost3 
                FROM   produkt_v1 
                WHERE  store = 'pro' ) :: numeric (8, 2) AS total_pro 
FROM     produkt_v1 
WHERE    date = 
         ( 
                  SELECT   date 
                  FROM     produkt_v1 
				   WHERE store != 'pro'
                  ORDER BY date DESC limit 1 ) 
OR       store = 'pro' 
ORDER BY number, 
         CASE 
                  WHEN store = 'coop' THEN 1 
                  WHEN store = 'mathem' THEN 2 
                  WHEN store = 'matse' THEN 3 
                  WHEN store = 'ica' THEN 4 
                  WHEN store = 'pro' THEN 5 
         END