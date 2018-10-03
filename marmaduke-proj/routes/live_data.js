"use strict";

let express = require("express");
let router = express.Router();
let configuration = require("./data/config/proj_settings");
let callbacks = require("./utils/router_callbacks");

/* MAIN PAGES */
router.get("/", callbacks.cbHomePage());

/* LIVE DATA */
router.get("/api/moored_now/:id", callbacks.cbLiveDataTable("moored_now", configuration.STATES_OF_MOORING));
router.get("/api/roadstead_now/:id", callbacks.cbLiveDataTable("roadstead_now", configuration.STATES_OF_ROADSTEAD));



module.exports = router;
