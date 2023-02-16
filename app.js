var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./lib/connectMongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//quitar cabecera de respuesta x powered by
app.set('x-powered-by', false);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Rutas del api
 */
app.use('/api/agentes', require('./routes/api/agentes'));
/**
 * Rutas del website
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use('/prueba', (req, res, next) => {
    res.send("pruebecilla")
    return;
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

    //comprobar si es un error de validacion
    if (err.array) {
        //const errorInfo = err.array({ onlyFirstError: true })[0];
        err.message = 'Se han producido los siguientes errores:\n';
        err.errors.forEach(errorInfo => {
            err.message += `- Error en ${errorInfo.location}, parametro ${errorInfo.param} ${errorInfo.msg}\n`

        });
        err.status = 422
    }

    res.status(err.status || 500);

    // si lo que ha fallado es una peticion al api
    // devuelvo el error en formato json
    if (req.originalUrl.startsWith('/api/')) {
        res.json({ error: err.message });
        return;
    }

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.render('error');
});

module.exports = app;