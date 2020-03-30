const { phase } = require("../models");
const Sequelize = require("sequelize");

module.exports = {
  async allPhases(req, res) {
    const phases = await phase.findAll();

    return res.json(phases);
  },

  async allPhasesPaginate(req, res) {
    const { page = 1 } = req.query;

    const options = {
      page,
      paginate: 10
    };

    const phases = await phase.paginate(options);

    return res.json({ phases, pageNumber: page });
  },

  async createPhase(req, res) {
    const { name } = req.body;
    const { data } = req.body;

    console.log(req.body);

    if (!name) {
      return res.json({ badMessage: "Name is empty" });
    }

    const nameExists = await phase.findOne({
      where: { name }
    });

    if (nameExists) {
      return res.json({ badMessage: "Name phase already exists" });
    }

    const phaseCreated = await phase.create(req.body);

    return res.json({ 
        id: phaseCreated.id, 
        name:phaseCreated.name, 
        message: "Phase successfully inserted" 
      });
  }
};
