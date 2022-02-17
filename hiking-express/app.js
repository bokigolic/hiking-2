var createError = require('http-errors');
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var root = require('./graphql-things/root.js');
var schema = require('./graphql-things/schema.js');


// DODVE SU IMPORTI I PROMENJIVE NEKE INICIJALNE
// SAD POCINJU PODESAVANJA SERVERA
var app = express();

app.use(cors()); // That’s it. CORS is now enabled. If you make a request to your app, you will notice a new header being returned: Access-Control-Allow-Origin: *

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

// PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// STATIC

app.use(express.static(path.join(__dirname, 'public'))); // ova komanda zadaje da sve sto je u fodleru public bude na izvolte


// ROUTES

// we use graphql on route '/api/v2/graphql'
app.use('/api/v2/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

// ukoliko to sto je stiglo sa get request nije pronadjeno u static folderu onda pokusava da vidi da li se podudara sa zadatim rutama
app.use('/', indexRouter);
app.use('/users', usersRouter);


// AKO NIJE USPELA NI JEDNA RUTA

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log('***** hiking-express backeckend READY!');

module.exports = app;
