const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const timeout = require('connect-timeout')

//inicia o express
const app = express();
app.use(express.json());

app.use(timeout('40s'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(haltOnTimedout)
app.use(haltOnTimedout)
app.use(cors());


//todos os tipo de requisições são redirecionados para o arquivos de rotas
app.use("/api", require("./app/routes"));

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

//Servidor irá ficar "ouvindo" a porta 3000
app.listen(process.env.PORT || 3001);

console.log("Server is running...");
