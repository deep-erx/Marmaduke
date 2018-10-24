"use strict";

let queries = require('../data/queries');
let moment = require('moment');
let db_settings = require('../data/config/db_settings');

const {Pool, client} = require('pg');

/*
 * Callback list
 */

function cbMooredNowTable(tmpl_name, shipStates){
    return (req, res, next) => {
  
      const pool = new Pool(db_settings.AUTH_DB);
      const id = req.params.id;
      const mdate = moment().format('YYYY-MM-DD');
  
      // async/await call
      (async ()=> {
        const client = await pool.connect();
        try {
          const params = {
            mdate: mdate,
            id: id
          };
  
          let dataContainer = {};

          let allMooredIDsQuery = queries.allActiveIDs(params.id, STATES.MOORING.ID);
          const allMooredIDs = await client.query(allMooredIDsQuery);
          let mooredRecords = allMooredIDs.rows;
          let counter = 0;
          
          for (let tripID of mooredRecords){
            let mooredNowQuery = queries.mooredNow(STATES.MOORING.TABLE_NAME, tripID.id_control_unit_data);
            let mooredNowRecords = await client.query(mooredNowQuery);
            
            dataContainer[tripID.id_control_unit_data] = mooredNowRecords.rows[0];
          } 

          let allMoored2MooredIDsQuery = queries.allActiveIDs(params.id, STATES.MOORING_TO_MOORING.ID);
          const allMoored2MooredIDs = await client.query(allMoored2MooredIDsQuery);
          let moored2MooredRecords = allMoored2MooredIDs.rows;

          for (let tripID of moored2MooredRecords){
            let moored2MooredNowQuery = queries.mooredNow(STATES.MOORING_TO_MOORING.TABLE_NAME, tripID.id_control_unit_data);
            let moored2MooredNowRecords = await client.query(moored2MooredNowQuery);
            
            dataContainer[tripID.id_control_unit_data] = moored2MooredNowRecords.rows[0];
          } 

          let allRoadstead2MooredIDsQuery = queries.allActiveIDs(params.id, STATES.ROADSTEAD_TO_MOORING.ID);
          const allRoadstead2MooredIDs = await client.query(allRoadstead2MooredIDsQuery);
          let roadstead2MooredRecords = allRoadstead2MooredIDs.rows;

          for (let tripID of roadstead2MooredRecords){
            let roadstead2MooredNowQuery = queries.mooredNow(STATES.ROADSTEAD_TO_MOORING.TABLE_NAME, tripID.id_control_unit_data);
            let roadstead2MooredNowRecords = await client.query(roadstead2MooredNowQuery);
            
            dataContainer[tripID.id_control_unit_data] = roadstead2MooredNowRecords.rows[0];
          } 

          res.send(dataContainer);

        } finally {
          client.release();
        }
  
      })().catch(e => console.log(e.stack));
    }
}


function cbArchiveDataTable(tmpl_name, states, startTimestamp, stopTimestamp){
    return (req, res, next) => {
  
      const pool = new Pool(db_settings.AUTH_DB);
      const id = req.params.id;
      const startTimestamp = req.params.startTimestamp;
      const stopTimestamp = req.params.stopTimestamp;

      const mdate = moment().format('YYYY-MM-DD');
      console.log(states);

      // async/await call
      (async ()=> {
        const client = await pool.connect();
        try {
          const params = {
            mdate: mdate,
            statesOfInterest: states,
            id: id,
            startTimestamp: startTimestamp,
            stopTimestamp: stopTimestamp
          };
  
          let query = queries.shipsArchive(params);
          
          console.log(query);

          const records = await client.query(query);
          res.render(tmpl_name, {allDataArchived: records.rows});
  
        } finally {
          client.release();
        }
  
      })().catch(e => console.log(e.stack));
    }
}


function cbStaticDataTable(tmpl_name, states){
    return (req, res, next) => {
  
      const pool = new Pool(db_settings.AUTH_DB);
      const id = req.params.id;
      const mdate = moment().format('YYYY-MM-DD');
  
      // async/await call
      (async ()=> {
        const client = await pool.connect();
        try {
          const params = {
            mdate: mdate,
            statesOfInterest: states,
            id: id
          };
  
          let query = queries.shipsStatic(params);
          
          const records = await client.query(query);
          res.render(tmpl_name, {allDataNow: records.rows});
  
        } finally {
          client.release();
        }
  
      })().catch(e => console.log(e.stack));
    }
}

function cbPrevisionDataTable(tmpl_name, states){
    return (req, res, next) => {
  
      const pool = new Pool(db_settings.AUTH_DB);
      const id = req.params.id;
      const mdate = moment().format('YYYY-MM-DD');
  
      // async/await call
      (async ()=> {
        const client = await pool.connect();
        try {
          const params = {
            mdate: mdate,
            id: id
          };
  
          let query = queries.shipsArrivalPrevs(params);
          
          const records = await client.query(query);
          res.render(tmpl_name, {allDataNow: records.rows});
  
        } finally {
          client.release();
        }
      })().catch(e => console.log(e.stack));
    }
}

function cbArrivalPrevisionsArchive(tmpl_name){
    return (req, res, next) => {
  
      const pool = new Pool(db_settings.AUTH_DB);
      const id = req.params.id;
      const inputDate = req.params.inputDate;
  
      // async/await call
      (async ()=> {
        const client = await pool.connect();
        try {
          const params = {
            inputDate: inputDate,
            id: id
          };
  
          let query = queries.arrivalPrevisionsArchive(params);
          
          console.log(query);

          const records = await client.query(query);
          res.render(tmpl_name, {allDataArchived: records.rows});
  
        } finally {
          client.release();
        }
      })().catch(e => console.log(e.stack));
    }
}

function cbShippedGoodsDataTable(tmpl_name, states){
    return (req, res, next) => {
  
      const pool = new Pool(db_settings.AUTH_DB);
      const id = req.params.id;
      const mdate = moment().format('YYYY-MM-DD');
  
      // async/await call
      (async ()=> {
        const client = await pool.connect();
        try {
          const params = {
            mdate: mdate,
            statesOfInterest: states,
            id: id
          };
  
          let query = queries.shippedGoodsNow(params);
          
          const records = await client.query(query);
          res.render(tmpl_name, {allDataNow: records.rows});
  
        } finally {
          client.release();
        }
      })().catch(e => console.log(e.stack));
    }
}

function cbTrafficListDataTable(tmpl_name, states){
    return (req, res, next) => {
  
      const pool = new Pool(db_settings.AUTH_DB);
      const id = req.params.id;
      const mdate = moment().format('YYYY-MM-DD');
  
      // async/await call
      (async ()=> {
        const client = await pool.connect();
        try {
          const params = {
            mdate: mdate,
            statesOfInterest: states,
            id: id
          };
  
          let query = queries.trafficListNow(params);

          const records = await client.query(query);
          res.render(tmpl_name, {allDataNow: records.rows});
  
        } finally {
          client.release();
        }
      })().catch(e => console.log(e.stack));
    }
}


function cbHomePage(){
  return function(req, res) {
    res.render('home', { title: 'Main page' });
  }
}

module.exports = {
    cbHomePage: cbHomePage,
    cbMooredNowTable: cbMooredNowTable,
    cbStaticDataTable: cbStaticDataTable,
    cbPrevisionDataTable: cbPrevisionDataTable,
    cbArrivalPrevisionsArchive: cbArrivalPrevisionsArchive,
    cbShippedGoodsDataTable: cbShippedGoodsDataTable,
    cbTrafficListDataTable: cbTrafficListDataTable,
    cbArchiveDataTable: cbArchiveDataTable
}