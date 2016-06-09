  var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var path = require('path');
var bodyParser = require('body-parser');


var app  = express();


app.use(compression());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
//app.use('/public', express.static('public'));
//app.use('/assets', express.static(path.join(__dirname, 'assets')));
//app.use('/public', express.static(__dirname + 'public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var handlebars = require('express-handlebars')
    .create({defaultLayout: 'main',
         helpers: {
   toFixed:function(num){
    return parseFloat(num).toFixed();
   }
    }
});

app.engine('handlebars', handlebars.engine  );
app.set('view engine', 'handlebars');


var home = require('./routes/home');
var fetch = require('./routes/fetch');
var admin = require('./routes/admin');
var proxy = require('./routes/proxy');


app.use(fetch);
app.use(home);
app.use(admin);
app.use(proxy);


app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error');
});


server = app.listen(process.env.PORT || 3000, function(){
  console.log("Matpriser.nu server körs på port %d i %s läge", this.address().port, app.settings.env);
});
server.timeout = 120000;