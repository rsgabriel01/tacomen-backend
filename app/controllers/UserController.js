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

  async store(req, res) {
    const { email, login } = req.body;

    const emailExists = await user.findOne({
      where: { email }
    });

    if (emailExists) {
      return res.json(
        { 
          statusCode: 400,
          attention: "Este email já está vinculado à uma conta. Por favor, informe outro."
        }
      );
    }

    const loginExists = await user.findOne({
      where: { login }
    });

    if (loginExists) {
      return res.json(
        { 
          statusCode: 400,
          attention: "Este usuário já está sendo utilizado por outra pessoa. Por favor, informe outro." 
        }
      );
    }

    const userCreated = await user.create(req.body);

    return res.json(
      { 
        statusCode: 200,
        success: "Cadastro efetuado com sucesso."
      }
    );
  },

  async show(req, res) {
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
