const { user } = require("../models");
const Sequelize = require("sequelize");

module.exports = {
  async allUsers(req, res) {
    console.log('acessado users');
    
    const users = await user.findAll();

    return res.json(users);
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
    //armazena o id recebido na requisição em uma constante
    const { id } = req.params;

    //Verifica se ID da requisição existe no banco
    const idExists = await user.findOne({
      where: { id }
    });

    //Se o ID nao existe no banco retorna a requisição com o erro
    if (!idExists) {
      return res.json({ error: "ID not found" });
    }

    //Busca no banco os registro do ID recebido na requisição
    const userFinded = await user.findOne({ where: { id } });

    //Retorna a requisição com os dados do ID recebido
    return res.json(userFinded);
  }

  // async allPeopleLikeName(req, res) {
  //   const Op = Sequelize.Op;

  //   const { nome } = req.query;

  //   var query = `%${nome}%`;

  //   const people = await Pessoa.findAll({
  //     where: { nome: { [Op.like]: query } }
  //   });
  //   console.log(people);

  //   if (people && people.length === 0) {
  //     return res.status(204).json();
  //   }
  //   //Retorna todos os registros encontrados
  //   return res.json(people);
  // },

  // /* Listar todos os registros de um ID da tabela pessoa */
 

  

  // /* Alterar pessoa pelo ID */
  // async updatePeople(req, res) {
  //   //Armazena os dados recebidos na requisição em constantes
  //   const { id } = req.params;
  //   const { cpf } = req.body;
  //   const { nome } = req.body;
  //   const { idade } = req.body;
  //   const { sexo } = req.body;
  //   const { telefone } = req.body;
  //   const { email } = req.body;
  //   const { ativo } = req.body;

  //   //verifica se o cpf veio vazio na requisição
  //   if (!cpf) {
  //     return res.json({ error: "CPF is empty" });
  //   }

  //   //verifica se o nome veio vazio na requisição
  //   if (!nome) {
  //     return res.json({ error: "Nome is empty" });
  //   }

  //   //verifica se a idade veio vazio na requisição
  //   if (!idade) {
  //     return res.json({ error: "Idade is empty" });
  //   }

  //   //verifica se o email veio vazio na requisição
  //   if (!email) {
  //     return res.json({ error: "Email is empty" });
  //   }

  //   //verifica se o ativo veio vazio na requisição
  //   if (!ativo) {
  //     return res.json({ error: "Ativo is empty" });
  //   }

  //   //Verifica se ID da requisição existe no banco
  //   const idExists = await Pessoa.findOne({
  //     where: { id }
  //   });

  //   //Se o ID nao existe no banco retorna a requisição com o erro
  //   if (!idExists) {
  //     return res.json({ error: "ID not found" });
  //   }

  //   //Verifica se o CPF da requisição é valido
  //   if (CpfValidation(cpf) === false) {
  //     return res.json({ error: "Invalid cpf" });
  //   }

  //   //Verifica se cpf da requisição existe no banco
  //   const cpfExists = await Pessoa.findOne({
  //     where: { cpf }
  //   });

  //   //Se o cpf a ser alterado ja existe no banco mas nao é o que ja está cadastrado para esse id, retorna a requisição com o erro
  //   if (cpfExists && idExists.cpf != cpf) {
  //     return res.json({ error: "CPF already exists" });
  //   }

  //   //Verifica se o email da requisição existe no banco
  //   const emailExists = await Pessoa.findOne({
  //     where: { email: req.body.email }
  //   });

  //   //Se o email a ser alterado ja existe no banco mas nao é o que ja está cadastrado para esse id, retorna a requisição com o erro
  //   if (emailExists && idExists.email != email) {
  //     return res.json({ error: "Email already exists" });
  //   }

  //   //O registro com o dados da requsição filtradndo pelo ID recebido na requisição, se passar pelas validações anteriores
  //   await Pessoa.update(
  //     { nome, cpf, nome, idade, sexo, telefone, email, ativo },
  //     {
  //       where: { id }
  //     }
  //   );

  //   //retorna o ID que teve os registros alterados e mensagem de sucesso
  //   return res.json({ id: id, message: "Person has been updated" });
  // },

  // /*  Deleta registro da tabela pessoa */
  // async deleteOnePeople(req, res) {
  //   //armazena o id recebido na requisição em uma constante
  //   const { id } = req.params;

  //   //Verifica se o ID da requisição existe no banco
  //   const idExists = await Pessoa.findOne({
  //     where: { id }
  //   });

  //   //Se o ID nao existe no banco retorna a requisição com o erro
  //   if (!idExists) {
  //     return res.json({ error: "ID not found" });
  //   }

  //   //Busca no banco os registro do ID recebido na requisição
  //   await Pessoa.destroy({ where: { id } });

  //   //retorna o ID que teve os registros deletador e mensagem de sucesso
  //   return res.json({ id: id, message: "Person has been deleted" });
  // }
};
