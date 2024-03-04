"use strict";
import express from "express";
var router = express.Router();

/* GET home page. */
router
  .get("/", function (req, res) {
    res.status(200).json("Hello world");
  })
  .get("/version", function (req, res, next) {
    res.status(200).json("v1.3");
    res.end();
  });

export default router;
