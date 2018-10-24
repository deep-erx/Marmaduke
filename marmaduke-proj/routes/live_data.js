"use strict";

let express = require("express");
let router = express.Router();
let configuration = require("./data/config/proj_settings");
let callbacks = require("./utils/router_callbacks");

/* LAST ACTIVITY DATA */
router.get("/moored/:id", callbacks.cbLiveDataTable("moored_now", configuration.SHIP_STATES));
router.get("/roadstead/:id", callbacks.cbLiveDataTable("roadstead_now", configuration.STATES_OF_ROADSTEAD));
router.get("/arrival_previsions/:id", callbacks.cbPrevisionDataTable("arrival_previsions_now"));
router.get("/shipped_goods/:id", callbacks.cbShippedGoodsDataTable("shipped_goods_now"));
router.get("/traffic_list/:id", callbacks.cbTrafficListDataTable("traffic_list_now"));

/* STATIC DATA */
router.get("/arrivals/:id", callbacks.cbStaticDataTable("arrivals_now", configuration.STATES_OF_ARRIVALS));
router.get("/departures/:id", callbacks.cbStaticDataTable("departures_now", configuration.STATES_OF_DEPARTURES));

module.exports = router;
