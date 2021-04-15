const express = require('express');
const data = require('./data.json');
const projects = data.projects;

const app = express();

app.use(express.urlencoded({ extended: false }));
/* Serves static files from public folder */
app.use('/static', express.static('public'));

app.set('view engine', 'pug');


/* ROUTES */
app.get('/', function (req, res) {
  //console.log(data.projects);
  res.locals.data = data.projects;
  res.render('index', { projects });
});

app.get('/about', function (req, res) {
  res.render('about', data);
});

app.get('/projects/:id', (req, res) => {
  const id = req.params.id;
  const project = data.projects[id];
  if(project) {
    res.locals.data = data.projects;
    res.render('project', project);
  } else {
    res.redirect('/404');
  }
});


/* ERROR HANDLERS */ 
app.use((req, res, next) => {
  console.log('404 error handler called');
  res.status(404).render('page-not-found');
});

app.use((err, req, res, next) => {
  if (err) {
    console.log('Global error handler called', err);
  }

  if (err.status === 404) {
    res.status(404).render('page-not-found', { err });
  } else {
    err.message = err.message || `Oops! It looks like something went wrong on the server.`;
    res.status(err.status || 500).render('error', { err });
  }
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});