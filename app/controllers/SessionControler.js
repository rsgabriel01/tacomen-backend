const { user } = require("../models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
    async findOneUserLogin(req, res) {
        const { loginSearch } = req.params;
    
        const loginExists = await user.findOne({
          where: { login : loginSearch}
        });
    
        if (!loginExists) {
          return res.json({ attention: "Login not found" });
        }
    
        const { login } = await user.findOne({ where: { login : loginSearch } });
        
        return res.json({"login" : login});
    },

    async loginPassword(req, res) {
      const loginReq = req.body.login
      const { password } = req.body;

      if (!loginReq) {
        return res.json({ attention: "Login is empty" });
      }
  
      if (!password) {
        return res.json({ attention: "Password is empty" });
      }
  
      const loginExists = await user.findOne({
        where: { login : loginReq}
      });
  
      if (!loginExists) {
        return res.json({ attention: "Login not found" });
      }

      const [ login ] = await user.findAll({
        where: { 
          [Op.and]: [
            { login : loginReq},
            { password }
          ]
        }
      });
      
      console.log(login);
      
      if (login === undefined) {
        return res.json({ attention: "Incorrect password" });
      }
      
      return res.json(login.login);
  }

};
