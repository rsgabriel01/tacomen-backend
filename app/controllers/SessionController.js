const { user } = require("../models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
    async logon(req, res) {
      const { login, password } = req.body;
  
      const loginExists = await user.findOne({
        where: { login }
      });
  
      if (!loginExists) {
        return res.json(
          { 
            statusCode: 400,
            attention: "Parece que o usuário informado não existe no nosso banco de dados."
          }
        );
      }

      const loginFinded = await user.findOne({
        where: { 
          [Op.and]: [
            { login },
            { password }
          ]
        }
      });
      
      // console.log(login);
      
      if (!loginFinded) {
        return res.json(
          { 
            statusCode: 400,
            attention: "Você digitou a senha incorreta. Tente novamente."
          }
        );
      }
      
      return res.json(
        { 
          statusCode: 200,
          success: "Login efetuado", 
          loginFinded
        }
      );
  }

};
