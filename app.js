const express = require('express');
const pug = require('pug');
const data = require('./data.json');
const port = 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', data);
});

app.get('/about', function (req, res) {
  res.render('index', data);
});

app.get('/projects/:id', function (req, res) {
  let id = req.params.id;
  let project = data.Projects[id];
  if(project) {
    res.render('project',project);
  } else {
    res.redirect('/404');
  }
})

//const mainRoutes = require('./routes');
//const cardRoutes = require('./routes/cards');

//app.use(mainRoutes);
//app.use('/cards', cardRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(port, () => {
    console.log(`The application is running on localhost:${port}!`);
});