SELECT * FROM matche
SELECT * FROM ranking

INSERT INTO ranking ("userId", total_jump, total_point, total_death, total_time, total_enemy_killed) 
	(SELECT "userId",
	 		SUM(jump) AS total_jump, 
			SUM("point") AS total_point, 
			SUM(death) AS total_death,
	 		SUM(timer) AS total_time,
			SUM(enemy_killed) As total_enemy_killed
		FROM (SELECT 	"userId" AS "userId",
	 					max(jump) AS jump, 
						max("point") AS "point", 
						max(death) AS death,
	 					timer,
						max(enemy_killed) As enemy_killed
					FROM matche 
				WHERE "userId" = 5
				GROUP BY "userId", timer) AS totals_user
	GROUP BY "userId")
