var express = require('express');
var router = express.Router();
let callbacks = require('./utils/router_callbacks');
let configuration = require("./data/config/proj_settings");

router.get('/moored/:id/:startTimestamp/:stopTimestamp', callbacks.cbArchiveDataTable("archive_moored", configuration.STATES_OF_MOORING)),
router.get('/roadstead/:id/:startTimestamp/:stopTimestamp', callbacks.cbArchiveDataTable("archive_roadstead", configuration.STATES_OF_ROADSTEAD)),
router.get('/arrivals/:id/:startTimestamp/:stopTimestamp', callbacks.cbArchiveDataTable("archive_arrivals", configuration.STATES_OF_ARRIVALS)),
router.get('/departures/:id/:startTimestamp/:stopTimestamp', callbacks.cbArchiveDataTable("archive_departures", configuration.STATES_OF_DEPARTURES)),

module.exports = router;
