// loads environment variables from a .env file into process.env
import dotenv from "dotenv";
dotenv.config();

// Import necessary NPM packages
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import errorHandler from "./lib/error_handler"; //  error handling middleware
import auth from "./lib/passport_startegy"; // passport authentication middleware

// Import routes files
import userRoutes from "./routes/user_routes";
import groupRoutes from "./routes/group_routes";
import homeRoute from "./routes/home_routes";
import models from "./db/models";

const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const app = express();


// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

// define port for API to run on
const port = process.env.PORT;

/* The method `.use` sets up middleware for the Express application */

// register passport authentication middleware
app.use(auth);

// add `bodyParser` middleware which will parse JSON requests into
// JS objects before they reach the route files.
app.use(bodyParser.json());

// Parse Cookie header and populate req.cookies
app.use(cookieParser());

// this parses requests sent by `fetch`, which use a different content type
app.use(bodyParser.urlencoded({ extended: true }));

// register route files
app.use(groupRoutes);
app.use(userRoutes);
app.use(homeRoute);
// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler);

var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(port, () => {
  console.log("listening on port " + port);
});

io.on("connection", socket => {

  socket.on('SEND_MESSAGE', function (data){
    console.log(data) // we can pass it to database from here

    models.Message.create({
      body: data.message,
      member_name: data.author
     
  })
    io.emit('RECEIVE_MESSAGE', data)
  })
  socket.on("disconnect", () => console.log("Client disconnected"));
});

export default app;