const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // GET /repositories: Rota que lista todos os repositórios;

  return response.status(200).json(repositories)
  // TODO
});

app.post("/repositories", (request, response) => {

  const like = 0;

  const {title, url, techs} = request.body;

  const repository = {id: uuid(), title, url, techs, likes: like};

  repositories.push(repository);

  return response.status(400).json(repository);
});

app.put("/repositories/:id", (request, response) => {

  const { id } =  request.params;
  const {title, url, techs} = request.body;

  const Index = repositories.findIndex(repository => repository.id == id);

  if(Index < 0){
      //n encontrou
    return response.status(400).json({error : "Repository Not Found"})
  }

  const repository = {
    id,
    url,
    techs,
  }

  repositories[Index] = repository

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {

  const { id } =  request.params;

  const Index = repositories.findIndex(repository => repository.id == id);

  if(Index < 0){
    //n encontrou
  return response.status(400).json({error : "Repository Not Found"})
  }

  repositories.splice(Index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {

  const { id } =  request.params;

  const Index = repositories.findIndex(repository => repository.id == id);

  if(Index < 0){
    //n encontrou
  return response.status(400).json({error : "Repository Not Found"})
  }

  const url = repositories[Index].url;
  const techs = repositories[Index].techs;
  var likes = repositories[Index].likes;

  likes = likes + 1;

  const repository = {
    id,
    url,
    techs,
    likes,
  }

  repositories[Index] = repository;

  return response.send(repository);

  //
  // POST /repositories/:id/like: A rota deve aumentar o número de likes do repositório 
  // específico escolhido através do id presente nos parâmetros da rota,
  // a cada chamada dessa rota, o número de likes deve ser aumentado em 1;
  // TODO
});

module.exports = app;
