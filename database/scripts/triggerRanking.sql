SELECT * FROM "user"

SELECT * FROM "phase"

SELECT * FROM "userPhase"

SELECT * FROM "matche"

SELECT * FROM "ranking"

INSERT INTO ranking ("userId", total_jump, total_point, total_death, total_time, total_enemy_killed) 
	(SELECT "userId",
	 		SUM(jump) AS total_jump, 
			SUM("point") AS total_point, 
			SUM(death) AS total_death,
	 		SUM(timer) AS total_time,
			SUM(enemy_killed) As total_enemy_killed
		FROM (SELECT 	UP."userId" AS "userId", --1
			  			UP."phaseId" AS "phaseId",
	 					max(jump) AS jump, --2
						max("point") AS "point", --3
						min(death) AS death, --1
	 					min(timer) AS timer, --00:59
						max(enemy_killed) As enemy_killed --3
					FROM matche
			  	INNER JOIN "userPhase" AS UP ON matche."userPhaseMatcheId" = UP.id 
				WHERE "userId" = 1
				GROUP BY "userId", "phaseId") AS totals_user
	GROUP BY "userId")

UPDATE ranking SET  (total_jump, total_point, total_death, total_time, total_enemy_killed) = 
	(SELECT
	 		SUM(jump) AS total_jump, 
			SUM("point") AS total_point, 
			SUM(death) AS total_death,
	 		SUM(timer) AS total_time,
			SUM(enemy_killed) As total_enemy_killed
		FROM (SELECT 	UP."userId" AS "userId", --1
			  			UP."phaseId" AS "phaseId",
	 					max(jump) AS jump, --2
						max("point") AS "point", --3
						min(death) AS death, --1
	 					min(timer) AS timer, --00:59
						max(enemy_killed) As enemy_killed --3
					FROM matche
			  	INNER JOIN "userPhase" AS UP ON matche."userPhaseMatcheId" = UP.id 
				WHERE "userId" = 1
				GROUP BY "userId", "phaseId") AS totals_user)
