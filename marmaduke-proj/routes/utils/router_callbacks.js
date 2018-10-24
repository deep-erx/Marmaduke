"use strict";

let queries = require('../data/queries');
let moment = require('moment');
let db_settings = require('../data/config/db_settings');

const {Pool, client} = require('pg');

/*
 * Callback list
 */

function cbLiveDataTable(tmpl_name, shipStates){
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
  
          params.stateOfInterest = shipStates.MOORING;
          let mooringQuery = queries.shipsNow(params);
          const mooredRecords = await client.query(mooringQuery);

          params.stateOfInterest = shipStates.MOORING_TO_MOORING;
          let mooring2mooringQuery = queries.shipsNow(params);
          const mooring2mooringRecords = await client.query(mooring2mooringQuery);

          params.stateOfInterest = shipStates.ROADSTEAD_TO_MOORING;
          let roadstead2mooringQuery = queries.shipsNow(params);
          const roadstead2mooringRecords = await client.query(roadstead2mooringQuery);

          params.stateOfInterest = shipStates.WARPING;
          let warpingQuery = queries.shipsNow(params);
          const warpingRecords = await client.query(warpingQuery);

          params.stateOfInterest = shipStates.SIDE_CHANGING;
          let sideChangingQuery = queries.shipsNow(params);
          const sideChangingRecords = await client.query(sideChangingQuery);

          let records = mooredRecords.rows.concat(mooring2mooringRecords.rows,
                                             roadstead2mooringRecords.rows,
                                             warpingRecords.rows,
                                             sideChangingRecords.rows)

          res.render(tmpl_name, {allDataNow: records});
  
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
    cbLiveDataTable: cbLiveDataTable,
    cbStaticDataTable: cbStaticDataTable,
    cbPrevisionDataTable: cbPrevisionDataTable,
    cbArrivalPrevisionsArchive: cbArrivalPrevisionsArchive,
    cbShippedGoodsDataTable: cbShippedGoodsDataTable,
    cbTrafficListDataTable: cbTrafficListDataTable,
    cbArchiveDataTable: cbArchiveDataTable
}