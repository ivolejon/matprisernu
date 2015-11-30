var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var path = require('path');
var bodyParser = require('body-parser');


var app  = express();


app.use(compression());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var handlebars = require('express-handlebars')
    .create({defaultLayout: 'main',
    	 helpers: {
   toFixed:function(num){
   	return parseFloat(num).toFixed();
   }
    }
});

app.engine('handlebars', handlebars.engine	);
app.set('view engine', 'handlebars');


var home = require('./routes/home');
var fetch = require('./routes/fetch');
var about = require('./routes/about');
var jamforelsen = require('./routes/jamforelsen');
var nyheter = require('./routes/nyheter');


app.use(fetch);
app.use(home);
app.use(about);
app.use(jamforelsen);
app.use(nyheter);



app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error');
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Matpriser.nu server körs på port %d i %s läge", this.address().port, app.settings.env);
});