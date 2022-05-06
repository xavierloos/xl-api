const Joi = require('joi');
const express = require('express');
const app = express();
const importDetails = require('./details.json')
const importProjects = require('./projects.json')
const importExperience = require('./experince.json')
app.use(express.json());
 
const home = {
  Details: importDetails,
  Projects: importProjects,
  Experience: importExperience
}

app.get('/', (req, res) => {
  res.send(home);
});

app.get('/api/xavierloos', (req, res) => {
 res.send(home);
});
app.get('/api/xavierloos/projects/:id', (req, res) => {
 res.send(projects[0]);
})
app.get('/api/xavierloos/projects', (req, res) => {
 res.send(projects);
})

app.post('/api/xavierloos/projects', (req, res) => {
 // Object restructuring
 const { e } = validateProject(req.body)
 
 if (e) return res.status(400).send(e.details[0].message);

 const project = {
  id: projects.length + 1,
  project_name: req.body.project_name,
  project_image: req.body.project_image,
  project_github: req.body.project_github,
  project_preview: req.body.project_preview,
  project_description: req.body.project_description,
  project_creation_date: req.body.project_creation_date
 }
 projects.push(project)
 res.send(project)
})

app.put('/api/xavierloos/projects/:id', (req, res) => {
 const project = projects.find(p => p.id === parseInt(req.params.id));
 if(!project) return res.status(404).send("Invalid project ID")
 // Object restructuring
 const { e } = validateProject(req.body)
 
 if (e) return res.status(400).send(e.details[0].message);
  
 project.project_name = req.body.project_name;
 res.send(project)
})

app.delete('/api/xavierloos/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).send("Invalid project ID")
  
  const index = projects.indexOf(project);
  projects.splice(index, 1);

  res.send(project)
})

function validateProject(project) {
  const schema = Joi.object(
    { project_name: Joi.string().min(5).required() }
  )

  return schema.validate(project)
}
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listen on port ${port}...`))