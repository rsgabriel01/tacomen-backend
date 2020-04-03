const express = require("express");
const { celebrate, Segments, Joi } = require('celebrate');
const routes = express.Router();

const UserController = require("./controllers/UserController");
const PhaseController = require("./controllers/PhaseController");
const MatcheController = require("./controllers/MatcheController");
const SessionController = require("./controllers/SessionControler");

routes.get("/", (req, res) => {
  return res.send("Server is running...");
});

routes.get("/teste", (req, res) => {
  return res.json("teste");
});

//User
routes.get("/users", UserController.allUsers);

routes.get("/users/paginate", UserController.allUsersPaginate);

routes.post("/users/create", UserController.createUser);

routes.get("/users/:id", UserController.findOneUser);

//Session
routes.get("/session/:loginSearch", SessionController.findOneUserLogin);

routes.post("/session/logon",  celebrate({
  [Segments.BODY] : Joi.object().keys({
     login : Joi.string().required(),
     password : Joi.string().required().min(8).max(16)
  })  
}), SessionController.logon);


//Phase
routes.get("/phases", PhaseController.allPhases);

routes.get("/phases/paginate", PhaseController.allPhasesPaginate);

routes.post("/phases/create", PhaseController.createPhase);

//Matche
routes.get("/matche", MatcheController.allMatches);

routes.get("/matche/paginate", MatcheController.allMatchesPaginate);

routes.post("/matche/create", MatcheController.createMatche);

//Ranking
// routes.get("/ranking", MatcheController.allMatches);

// routes.get("/ranking/paginate", MatcheController.allMatchesPaginate);

// routes.post("/ranking/create", MatcheController.createMatche);

// routes.get("/people/:id", UserController.findOneUsers);

// routes.get("/peopleLikeSearch", UserController.allUsersLikeName);

// routes.put("/people/update/:id", UserController.updateUsers);

// routes.delete("/people/delete/:id", UserController.deleteOneUsers);

module.exports = routes;
