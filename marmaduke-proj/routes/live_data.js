"use strict";

let express = require("express");
let router = express.Router();
let configuration = require("./data/config/proj_settings");
let callbacks = require("./utils/router_callbacks");
let liveCallbacks = require("./utils/live_data_callbacks");

/* LIVE DATA */
router.get("/moored/:id", liveCallbacks.cbMooredNow());
router.get("/roadstead/:id", liveCallbacks.cbRoadsteadNow());
router.get("/arrivals/:id", liveCallbacks.cbArrivalsNow());
router.get("/departures/:id", liveCallbacks.cbDeparturesNow());

//router.get("/roadstead/:id", callbacks.cbLiveDataTable("roadstead_now", configuration.STATES_OF_ROADSTEAD));
router.get("/arrival_previsions/:id", callbacks.cbPrevisionDataTable("arrival_previsions_now"));
router.get("/shipped_goods/:id", callbacks.cbShippedGoodsDataTable("shipped_goods_now"));
router.get("/traffic_list/:id", callbacks.cbTrafficListDataTable("traffic_list_now"));

/* STATIC DATA */
router.get("/arrivals/:id", callbacks.cbStaticDataTable("arrivals_now", configuration.STATES_OF_ARRIVALS));
router.get("/departures/:id", callbacks.cbStaticDataTable("departures_now", configuration.STATES_OF_DEPARTURES));

module.exports = router;
