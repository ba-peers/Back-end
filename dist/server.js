"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _error_handler = require("./lib/error_handler");

var _error_handler2 = _interopRequireDefault(_error_handler);

var _passport_startegy = require("./lib/passport_startegy");

var _passport_startegy2 = _interopRequireDefault(_passport_startegy);

var _user_routes = require("./routes/user_routes");

var _user_routes2 = _interopRequireDefault(_user_routes);

var _group_routes = require("./routes/group_routes");

var _group_routes2 = _interopRequireDefault(_group_routes);

var _home_route = require("./routes/home_route");

var _home_route2 = _interopRequireDefault(_home_route);

var _models = require("./db/models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

// Import necessary NPM packages
// loads environment variables from a .env file into process.env
//  error handling middleware
// passport authentication middleware

// Import routes files


var http = require("http");
var socketIo = require("socket.io");
var axios = require("axios");

var app = (0, _express2.default)();

var corsOptions = {
  origin: '*',
  credentials: true };

app.use((0, _cors2.default)(corsOptions));

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
// app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

// define port for API to run on
var port = process.env.PORT;

/* The method `.use` sets up middleware for the Express application */

// register passport authentication middleware
app.use(_passport_startegy2.default);

// add `bodyParser` middleware which will parse JSON requests into
// JS objects before they reach the route files.
app.use(_bodyParser2.default.json());

// Parse Cookie header and populate req.cookies
app.use((0, _cookieParser2.default)());

// this parses requests sent by `fetch`, which use a different content type
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// register route files
app.use(_group_routes2.default);
app.use(_user_routes2.default);
app.use(_home_route2.default);
// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(_error_handler2.default);

var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(port, function () {
  console.log("listening on port " + port);
});

io.on("connection", function (socket) {

  socket.on('SEND_MESSAGE', function (data) {
    console.log(data); // we can pass it to database from here

    _models2.default.Message.create({
      body: data.message,
      member_name: data.author

    });
    io.emit('RECEIVE_MESSAGE', data);
  });
  socket.on("disconnect", function () {
    return console.log("Client disconnected");
  });
});

exports.default = app;