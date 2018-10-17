"use strict";

let express = require("express");
let router = express.Router();
let configuration = require("./data/config/proj_settings");
let callbacks = require("./utils/router_callbacks");

/* LAST ACTIVITY DATA */
router.get("/moored_now/:id", callbacks.cbLiveDataTable("moored_now", configuration.STATES_OF_MOORING));
router.get("/roadstead_now/:id", callbacks.cbLiveDataTable("roadstead_now", configuration.STATES_OF_ROADSTEAD));
router.get("/arrival_previsions_now/:id", callbacks.cbPrevisionDataTable("arrival_previsions_now"));
router.get("/shipped_goods_now/:id", callbacks.cbShippedGoodsDataTable("shipped_goods_now"));
router.get("/traffic_list_now/:id", callbacks.cbTrafficListDataTable("traffic_list_now"));


/* STATIC DATA */
router.get("/arrivals_now/:id", callbacks.cbStaticDataTable("arrivals_now", configuration.STATES_OF_ARRIVALS));
router.get("/departures_now/:id", callbacks.cbStaticDataTable("departures_now", configuration.STATES_OF_DEPARTURES));

module.exports = router;
