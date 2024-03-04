"use strict";
import debug from "debug";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import routes from "./controllers/index.js";
import config from "./config/config.js";
import fs from "fs";
import https from "https";

// import articlesAction from './classes/articlesAction.js';
//import users from './controllers/users.js';

let app = express();

// uncomment after placing your favicon in /public
//app.use(favicon("../favicon.ico"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register views
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((req, res, next) => {
  if (req.protocol === "http") {
    res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
      message: err.message,
      error: err,
    });
    next(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    message: err.message,
    error: {},
  });
  next(err);
});
app.set("port", config.APP_PORT || 3000);

if (config.Prod) {
  const httpsOptions = {
    cert: fs.readFileSync("Cert file"),
    ca: fs.readFileSync("Ca file"),
    key: fs.readFileSync("Key "),
  };
  const httpsServer = https.createServer(httpsOptions, app);

  httpsServer.listen(app.get("port"), config.Host);
} else {
  var server = app.listen(app.get("port"), function () {
    debug("Express server listening on port " + server.address().port);
    console.log(server.address());
    console.log(
      `API is available at https://${config.Host}:${app.get("port")}`
    );
  });
}
