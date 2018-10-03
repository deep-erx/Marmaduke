"use strict";

let express = require("express");
let router = express.Router();
let configuration = require("./data/proj_settings");
let callbacks = require("./utils/router_callbacks");

/* GET home page. */
router.get("/", callbacks.cbHomePage());

router.get("/api/moored_now/:id", callbacks.cbLiveDataTable("moored_now", configuration.STATES_OF_MOORING));
router.get("/api/roadstead_now/:id", callbacks.cbLiveDataTable("roadstead_now", configuration.STATES_OF_ROADSTEAD));

module.exports = router;
