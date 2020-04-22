const { matche } = require("../models");
const { user } = require("../models");
const { phase } = require("../models");
const { userPhase } = require("../models");
const { ranking } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");
const rawQueries = require('../../config/rawQueries')

module.exports = {
  async index(req, res) {
    const matches = await matche.findAll();

    return res.json(matches);
  },

  async indexPaginate(req, res) {
    const { page = 1 } = req.query;

    const options = {
      page,
      paginate: 10
    };

    const matches = await matche.paginate(options);

    return res.json({ matches, pageNumber: page });
  },
  async store(req, res) {
    const { userId } = req.body;
    const { phaseId} = req.body;
    const { jump } = req.body;
    const { point } = req.body;
    const { time } = req.body;
    const { enemy_killed } = req.body;
    const { death } = req.body;

    console.log(req.body);
    
    let segundo = time % 60;
    let minutos = time / 60;
    let minuto = minutos % 60;
    let hora = minutos / 60;
    
    let timer = Math.floor(hora) + ":" + Math.floor(minuto) + ":" + Math.floor(segundo);
    
    const userExists = await user.findOne({
      where: { id: userId }
    });

    if (!userExists) {
      return res.json({ message: "User not exists" });
    }

    const phaseExists = await phase.findOne({
      where: { id: phaseId }
    });

    if (!phaseExists) {
      return res.json({ message: "Phase not exists" });
    }

    const [userPhaseFinded, created] = await userPhase.findOrCreate({
      where: { userId, phaseId }
    });

    // console.log(created);
    // console.log(userPhaseFinded);

    const matcheCreated = await matche.create(
      { 
        userPhaseId: userPhaseFinded.id,
        jump,
        point,
        timer,
        enemy_killed,
        death 
      }
    );

    const idUserRankingExists = await ranking.findOne({
      where: { userId }
    });

    if (!idUserRankingExists) {
      const rankingInsert = await  rawQueries.query(
        'INSERT INTO ranking ("userId", total_jump, total_point, total_death, total_time, total_enemy_killed) ' +
          '(SELECT  "userId", ' + 
                    'SUM(jump) AS total_jump, ' +
                    'SUM("point") AS total_point, ' +
                    'SUM(death) AS total_death, ' +
                    'SUM(timer) AS total_time, ' +
                    'SUM(enemy_killed) As total_enemy_killed ' +
                  'FROM (SELECT UP."userId" AS "userId", ' +
                                'UP."phaseId" AS "phaseId", ' +
                                'min(jump) AS jump, ' +
                                'max("point") AS "point", ' +
                                'min(death) AS death, ' +
                                'min(timer) AS timer, ' +
                                'max(enemy_killed) As enemy_killed ' +
                              'FROM matche ' +
                              'INNER JOIN "userPhase" AS UP ON matche."userPhaseId" = UP.id ' +
                            'WHERE "userId" = ' + userId +
                            ' GROUP BY "userId", "phaseId") AS totals_user ' +
            'GROUP BY "userId")', 
        {
          type: QueryTypes.INSERT
        }
      );

    } else if (idUserRankingExists){
      const rankingUpdate = await  rawQueries.query(
        'UPDATE ranking SET (total_jump, total_point, total_death, total_time, total_enemy_killed) = ' +
          '(SELECT ' + 
                  'SUM(jump) AS total_jump, ' +
                  'SUM("point") AS total_point, ' +
                  'SUM(death) AS total_death, ' +
                  'SUM(timer) AS total_time, ' +
                  'SUM(enemy_killed) As total_enemy_killed ' +
                'FROM (SELECT 	UP."userId" AS "userId", ' +
                                'UP."phaseId" AS "phaseId", ' +
                                'min(jump) AS jump, ' +
                                'max("point") AS "point", ' +
                                'min(death) AS death, ' +
                                'min(timer) AS timer, ' +
                                'max(enemy_killed) As enemy_killed ' +
                              'FROM matche ' +
                              'INNER JOIN "userPhase" AS UP ON matche."userPhaseId" = UP.id ' +
                            'WHERE "userId" = ' + userId +
                          '  GROUP BY "userId", "phaseId") AS totals_user) ' + 
          'WHERE "userId" = ' + userId, 
        {
          type: QueryTypes.UPDATE
        }
      );
    }else {
      return res.json({ attention: "Ops, Something went wrong" });
    }

    return res.json(matcheCreated);
  }
}