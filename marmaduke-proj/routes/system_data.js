"use strict";

let express = require("express");
let router = express.Router();
let configuration = require("./data/config/proj_settings");
let callbacks = require("./utils/router_callbacks");

router.get("/index", callbacks.cbHomePage());

module.exports = router;

