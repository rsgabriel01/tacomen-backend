const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/UserController");
const PhaseController = require("./controllers/PhaseController");
const User_phaseController = require("./controllers/User_phaseController");
const SessionController = require("./controllers/SessionControler");

routes.get("/", (req, res) => {
  return res.send("Server is running...");
});

//User
routes.get("/users", UserController.allUsers);

routes.get("/users/paginate", UserController.allUsersPaginate);

routes.post("/users/create", UserController.createUser);

routes.get("/users/:id", UserController.findOneUser);

//Session
routes.get("/session/:loginSearch", SessionController.findOneUserLogin);

routes.post("/session/loginPassword", SessionController.loginPassword);


//Phase
routes.get("/phases", PhaseController.allPhases);

routes.get("/phases/paginate", PhaseController.allPhasesPaginate);

routes.post("/phases/create", PhaseController.createPhase);

//User_phase
routes.get("/usersPhases", User_phaseController.allUser_phase);

routes.get("/usersPhases/paginate", User_phaseController.allUser_phasePaginate);

routes.post("/usersPhases/create", User_phaseController.createUser_phase);

// routes.get("/people/:id", UserController.findOneUsers);

// routes.get("/peopleLikeSearch", UserController.allUsersLikeName);

// routes.put("/people/update/:id", UserController.updateUsers);

// routes.delete("/people/delete/:id", UserController.deleteOneUsers);

module.exports = routes;
