const { matche } = require("../models");
const { user } = require("../models");
const { phase } = require("../models");
const { Op, fn, col, literal, QueryTypes, Sequelize } = require("sequelize");
const rawQueries = require('../../config/rawQueries')

module.exports = {
  async allMatches(req, res) {
    const matches = await matche.findAll({
      include: [{
        model: user,
      }]
    });

    return res.json(matches);
  },

  async allMatchesPaginate(req, res) {
    const { page = 1 } = req.query;

    const options = {
      page,
      paginate: 10
    };

    const matches = await matche.paginate(options);

    return res.json({ matches, pageNumber: page });
  },
  async createMatche(req, res) {
    const { userId } = req.body;
    const { phaseId } = req.body;
    const { jump } = req.body;
    const { point } = req.body;
    const { timer } = req.body;
    const { enemy_killed } = req.body;
    const { death } = req.body;

    if (!userId) {
      return res.json({ error: "ID user is empty" });
    }

    if (!phaseId) {
      return res.json({ error: "ID phase is empty" });
    }

    if (!jump) {
      return res.json({ error: "Jump is empty" });
    }

    if (!point) {
      return res.json({ error: "Point is empty" });
    }

    if (!timer) {
      return res.json({ error: "Timer is empty" });
    }

    if (!enemy_killed) {
      return res.json({ error: "Enemy killed is empty" });
    }

    if (!death) {
      return res.json({ error: "Death is empty" });
    }

    const idUserExists = await user.findOne({
      where: { id : userId }
    });

    if (!idUserExists) {
      return res.json({ error: "User not exists" });
    }
    
    const idPhaseExists = await phase.findOne({
      where: { id : phaseId }
    });

    if (!idPhaseExists) {
      return res.json({ error: "Phase not exists" });
    }

    // const MatcheExists = await matche.findAll({
    //   where: { 
    //     [Op.and]: [
    //       { userId },
    //       { phaseId }
    //     ]
    //   }
    // });
    // console.log(MatcheExists);
    
    // if (MatcheExists.length !== 0) {
      
    //   return res.json({ error: "Matche already related" });
    // }

    const MatcheCreated = await matche.create(req.body);

    return res.json({ MatcheCreated, message: "Matche successfully inserted" });
  },
  async testRanking(req, res) {
    try {
      const matches = await  rawQueries.query(
        'SELECT "userId", ' + 
                'SUM(jump) AS total_jump, ' +
                'SUM("point") AS total_point, ' +
                'SUM(death) AS total_death, ' +
                'SUM(timer) AS total_time, ' +
                'SUM(enemy_killed) As total_enemy_killed ' +
              'FROM (SELECT 	UP."userId" AS "userId", ' +
                'UP."phaseId" AS "phaseId", ' +
                'max(jump) AS jump, ' +
                'max("point") AS "point", ' +
                'min(death) AS death, ' +
                'min(timer) AS timer, ' +
                'max(enemy_killed) As enemy_killed ' +
                'FROM matche ' +
              'INNER JOIN "userPhase" AS UP ON matche."userPhaseMatcheId" = UP.id ' +
              'WHERE "userId" = 1 ' +
              'GROUP BY "userId", "phaseId") AS totals_user ' +
        'GROUP BY "userId"', {
  type: QueryTypes.SELECT
 });
      // matche.findAll({
      //   attributes: [
      //     'userId', 
      //     'phaseId', 
      //     [fn('min', col('jump')), 'minJump'],
      //     [fn('max', col('point')), 'maxPoint'],
      //     [fn('min', col('death')), 'minDeath'],
      //     [fn('min', col('timer')), 'minTimer'],
      //     [fn('max', col('enemy_killed')), 'max_enemy_killed'],
      //   ],
      //   where: {
      //     userId: 1
      //   },
      //   group: ['userId', 'phaseId']
      // });

      return res.json(matches);
    } catch (error) {
      console.log(error); 
    }
  }
}