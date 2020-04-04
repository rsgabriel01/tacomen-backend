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
        return res.json({ attention: "Login not found" });
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
        return res.json({ attention: "Incorrect password" });
      }
      
      return res.json(loginFinded);
  }

};
