var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require("path");
var fs = require("fs");
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var js = fs.readFileSync("./public/javascripts/jquery.js").toString();

let gif = (new Buffer("R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=", 'base64'));
var png = (new Buffer("R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", 'base64'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all("*", (req, res, next) => {
  res.removeHeader('Transfer-Encoding');
  res.removeHeader('X-Powered-By');
  res.set('Server', 'nginx/1.10.3 (Ubuntu)');
  res.set('X-Powered-By', 'PHP/5.6.30-0+deb8u1');
  next();
})

app.all('*.js', (req, res, next) => {
  res.set('Content-Type', 'text/javascript; charset=UTF-8');
  res.send(js);
});

app.all('*.gif', (req, res, next) => {
  res.set('Content-Type', 'image/gif');
  res.send(gif);
});

app.all('*.json', (req, res, next) => {
  res.set('Content-Type', 'application/json');
  res.send('{}');
});

app.all('*.png', (req, res, next) => {
  res.set('Content-Type', 'image/png');
  res.send(png);
});


app.all('*', (req, res, next) => {
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.send('');
});

module.exports = app;
