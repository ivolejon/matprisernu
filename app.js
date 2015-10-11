var express = require('express');
var app  = express();
var morgan = require('morgan');
var compression = require('compression');
var path = require('path');



app.use(compression());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


var handlebars = require('express-handlebars')
    .create({defaultLayout: 'main'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


var home = require('./routes/home');
var fetch = require('./routes/fetch');


app.use(fetch);
app.use(home);



app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error');
});


app.listen(3000);
console.log('ivo');