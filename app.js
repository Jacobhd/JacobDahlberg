const express = require('express');
const data = require('./data.json'); //import file
const projects = data.projects;
//const { projects } = require("../data.json");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

// routes
app.get('/', function (req, res) {
  //console.log(data.projects);
  res.render('index', { projects });
});

app.get('/about', function (req, res) {
  res.render('about', data);
});

app.get('/project', function (req, res) {
  res.render('project', data);
});



app.get('/projects/:id', function (req, res) {
  let id = req.params.id;
  let project = data.projects[id];
  if(project) {
    res.render('project',project);
  } else {
    res.redirect('/404');
  }
})


// error handlers
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  //err.message = "Oh noes!";
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});