const express = require('express');
const cors = require('cors');
const { uuid , isUuid} = require('uuidv4')
const app = express();

app.use(cors()); //permite que qualquer frontend que tenha acesso a rota possa se comunicar com o backend
app.use(express.json()); //antes das rotas

const projects = []; //simular banco de dados

function logRequest (request, response, next){
    const method = request.method;
    const url = request.url;

    console.log(method + '  --  ' + url);

    return next(); //proximo middleware
}

function validateProjectID (request, response, next){
    const { id } = request.params;

    if(!isUuid(id)){
        return response.status(400).json(
            {
                error : "Invalid ID"
            }
        )
    }
    return next();
}
app.use(logRequest);
app.use('/projects/:id', validateProjectID);


app.get('/projects', logRequest, (request,response) => {

    const {title} =  request.query;

    const resusts =  title
        ? projects.filter(project => project.title.includes(title))
        : projects;
    
    return response.json(resusts);
    // const query = request.query;
    // console.log(query);

    // return response.json([
    //     "Projeto 1",
    //     "Projeto 2"
    // ]);

    return response.json(projects);
});

app.post('/projects', (request,response) => {
    const {title, owner} =  request.body;

    const project = {id: uuid(), title, owner};

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', validateProjectID,(request,response) => {

    const { id } =  request.params;
    const {title, owner} =  request.body;

    //console.log(id);
    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0){
        //n encontrou
        return response.status(400).json({error : "Project Not Found"})
    }
    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] =  project

    return response.json(project);

});

app.delete('/projects/:id', validateProjectID,(request,response) => {
    const { id } =  request.params;
    
    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex < 0){
        //n encontrou
        return response.status(400).json({error : "Project Not Found"})
    }

    projects.splice(projectIndex, 1);

    return response.send(204);
});

app.listen(3333, () => {
    // localhost:3333
    console.log('BackEnd Started');
});