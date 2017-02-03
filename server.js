const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//Port configuration for Heroku Server (port)
const port = process.env.PORT || 3001;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

/*
 *Middlevare
 */

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log +'\n', (err) => {
      if(err){
        console.log('Unable to append to server.log.');
      }
    });
    next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

/*
 *hbs helpers
 */

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

/*
*Routes
*/

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello Express',
    title: 'Home Page'
   });
});

app.get('/about',(req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    title: 'About Us'
  });
});

app.get('/projects',(req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects',
    title: 'Projects'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
