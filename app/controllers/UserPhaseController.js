const { userPhase, user, phase } = require("../models");
const Sequelize = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const usersPhases = await userPhase.findAll();

      return res.json(usersPhases);
    } catch (error) {
      console.log(error); 
    }
  },

  async indexPaginate(req, res) {
    const { page = 1 } = req.query;

    const options = {
      page,
      paginate: 10
    };

    const usersPhases = await userPhase.paginate(options);

    return res.json({ usersPhases, pageNumber: page });
  },

  async store(req, res) {
    const { userId, phaseId } = req.body;

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

    const userPhaseExists = await userPhase.findOne({
      where: { 
        userId,
        phaseId 
      } 
    });

    if (userPhaseExists) {
      return res.json({ message: "User Phase already related" });
    }

    const usersPhasesCreated = await userPhase.create(req.body);

    return res.json({ usersPhasesCreated, message: "User Phase successfully related" });
  },

  async show(req, res) {
    const { userId } = req.query;

    console.log(userId);
    
    const userExists = await user.findOne({
      where: { id: userId }
    });

    if (!userExists) {
      return res.json({ message: "User not exists" });
    }

    const usersPhasesFinded = await userPhase.findAll({
      where: { 
        userId
      } 
    });
    
    return res.json(Object.assign({}, usersPhasesFinded));
  }
};
