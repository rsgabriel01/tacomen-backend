const { matche } = require("../models");
const { user } = require("../models");
const { phase } = require("../models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  async allMatches(req, res) {
    const matches = await matche.findAll();

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

    const MatcheCreated = await matche.create(req.body);

    return res.json({ MatcheCreated, message: "Matche successfully inserted" });
  }
};