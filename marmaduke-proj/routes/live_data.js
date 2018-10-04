"use strict";

let express = require("express");
let router = express.Router();
let configuration = require("./data/config/proj_settings");
let callbacks = require("./utils/router_callbacks");

/* MAIN PAGES */
router.get("/", callbacks.cbHomePage());

/* LAST ACTIVITY DATA */
router.get("/api/moored_now/:id", callbacks.cbLiveDataTable("moored_now", configuration.STATES_OF_MOORING));
router.get("/api/roadstead_now/:id", callbacks.cbLiveDataTable("roadstead_now", configuration.STATES_OF_ROADSTEAD));

/* STATIC DATA */
router.get("/api/arrivals_now/:id", callbacks.cbStaticDataTable("arrivals_now", configuration.STATES_OF_ARRIVALS));
router.get("/api/departures_now/:id", callbacks.cbStaticDataTable("departures_now", configuration.STATES_OF_DEPARTURES));

module.exports = router;
