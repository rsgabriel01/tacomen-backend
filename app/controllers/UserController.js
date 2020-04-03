const { user } = require("../models");
const Sequelize = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const users = await user.findAll();

      return res.json(users);
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

    const users = await user.paginate(options);

    return res.json({ users, pageNumber: page });
  },

  async create(req, res) {
    const { email, login } = req.body;

    const emailExists = await user.findOne({
      where: { email }
    });

    if (emailExists) {
      return res.json({ message: "Email already exists" });
    }

    const loginExists = await user.findOne({
      where: { login }
    });

    if (loginExists) {
      return res.json({ message: "Login already exists" });
    }

    const userCreated = await user.create(req.body);

    return res.json({ userCreated, message: "User successfully created" });
  },

  async findOneUser(req, res) {
    const { id } = req.params;

    const idExists = await user.findOne({
      where: { id }
    });

    if (!idExists) {
      return res.json({ error: "ID not found" });
    }

    const userFinded = await user.findOne({ where: { id } });

    return res.json(userFinded);
  }
};
