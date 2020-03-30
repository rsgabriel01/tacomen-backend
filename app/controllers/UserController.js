const { user } = require("../models");
const Sequelize = require("sequelize");

module.exports = {
  async allUsers(req, res) {
    console.log('acessado users');
    try {
      const users = await user.findAll();

      return res.json(users);
    } catch (error) {
      console.log(error); 
    }
  },

  async allUsersPaginate(req, res) {
    const { page = 1 } = req.query;

    const options = {
      page,
      paginate: 10
    };

    const users = await user.paginate(options);

    return res.json({ users, pageNumber: page });
  },

  async createUser(req, res) {
    const { email } = req.body;
    const { login } = req.body;
    const { password } = req.body;

    if (!email) {
      return res.json({ message: "Email is empty" });
    }

    if (!login) {
      return res.json({ message: "Login is empty" });
    }

    if (!password) {
      return res.json({ message: "Password is empty" });
    }

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

    if (password.length < 8 ||password.length > 16) {
      return res.json({ message: "Password less than 8 or greater than 16 characters" });
    }

    const userCreated = await user.create(req.body);

    return res.json({ userCreated, message: "User successfully inserted" });
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
