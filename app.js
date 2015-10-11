var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var path = require('path');
var md5 = require('md5');
var favicon = require('serve-favicon');

var app  = express();
app.use(favicon(__dirname + '/public/image/favicon.png'));

app.use(compression());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


var handlebars = require('express-handlebars')
    .create({defaultLayout: 'main'
});

app.engine('handlebars', handlebars.engine	);
app.set('view engine', 'handlebars');


var home = require('./routes/home');
var fetch = require('./routes/fetch');


app.use(fetch);
app.use(home);



app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error');
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});