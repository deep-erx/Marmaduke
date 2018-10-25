"use strict";

let queries = require('../data/queries');
let moment = require('moment');
let db_settings = require('../data/config/db_settings');
let configuration = require("../data/config/proj_settings");

const {Pool, client} = require('pg');

/*
 * Callback list
 */

function cbMooredNow(){
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

          let allMooredIDsQuery = queries.allActiveIDs(params.id, configuration.STATES.MOORING.ID);
          const allMooredIDs = await client.query(allMooredIDsQuery);
          let mooredRecords = allMooredIDs.rows;
          let counter = 0;
          
          for (let tripID of mooredRecords){
            let mooredNowQuery = queries.mooredNow(configuration.STATES.MOORING.TABLE_NAME, tripID.id_control_unit_data);
            let mooredNowRecords = await client.query(mooredNowQuery);
            
            dataContainer[tripID.id_control_unit_data] = mooredNowRecords.rows[0];
          } 

          let allMoored2MooredIDsQuery = queries.allActiveIDs(params.id, configuration.STATES.MOORING_TO_MOORING.ID);
          const allMoored2MooredIDs = await client.query(allMoored2MooredIDsQuery);
          let moored2MooredRecords = allMoored2MooredIDs.rows;

          for (let tripID of moored2MooredRecords){
            let moored2MooredNowQuery = queries.mooredNow(configuration.STATES.MOORING_TO_MOORING.TABLE_NAME, tripID.id_control_unit_data);
            let moored2MooredNowRecords = await client.query(moored2MooredNowQuery);
            
            dataContainer[tripID.id_control_unit_data] = moored2MooredNowRecords.rows[0];
          } 

          let allRoadstead2MooredIDsQuery = queries.allActiveIDs(params.id, configuration.STATES.ROADSTEAD_TO_MOORING.ID);
          const allRoadstead2MooredIDs = await client.query(allRoadstead2MooredIDsQuery);
          let roadstead2MooredRecords = allRoadstead2MooredIDs.rows;

          for (let tripID of roadstead2MooredRecords){
            let roadstead2MooredNowQuery = queries.mooredNow(configuration.STATES.ROADSTEAD_TO_MOORING.TABLE_NAME, tripID.id_control_unit_data);
            let roadstead2MooredNowRecords = await client.query(roadstead2MooredNowQuery);
            
            dataContainer[tripID.id_control_unit_data] = roadstead2MooredNowRecords.rows[0];
          } 

          res.send(dataContainer);

        } finally {
          client.release();
        }
  
      })().catch(e => console.log(e.stack));
    }
} // end cbMooredNow


function cbRoadsteadNow(){
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

          let allRoadsteadIDsQuery = queries.allActiveIDs(params.id, configuration.STATES.ROADSTEAD.ID);
          const allRoadsteadIDs = await client.query(allRoadsteadIDsQuery);
          let roadsteadRecords = allRoadsteadIDs.rows;
          let counter = 0;
          
          for (let tripID of roadsteadRecords){
            let roadsteadNowQuery = queries.roadsteadNow(configuration.STATES.ROADSTEAD.TABLE_NAME, tripID.id_control_unit_data);
            let roadsteadNowRecords = await client.query(roadsteadNowQuery);
            
            dataContainer[tripID.id_control_unit_data] = roadsteadNowRecords.rows[0];
          } 

          let allMoored2RoadsteadIDsQuery = queries.allActiveIDs(params.id, configuration.STATES.MOORING_TO_ROADSTEAD.ID);
          const allMoored2RoadsteadIDs = await client.query(allMoored2RoadsteadIDsQuery);
          let moored2RoadsteadRecords = allMoored2RoadsteadIDs.rows;

          for (let tripID of moored2RoadsteadRecords){
            let moored2RoadsteadNowQuery = queries.roadsteadNow(configuration.STATES.MOORING_TO_ROADSTEAD.TABLE_NAME, tripID.id_control_unit_data);
            let moored2RoadsteadNowRecords = await client.query(moored2RoadsteadNowQuery);
            
            dataContainer[tripID.id_control_unit_data] = moored2RoadsteadNowRecords.rows[0];
          } 

          res.send(dataContainer);

        } finally {
          client.release();
        }
  
      })().catch(e => console.log(e.stack));
    }
} //end cbRoadsteadNow


function cbArrivalsNow(){
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
  
          
          let arrivalsNowQuery = queries.arrivalsNow(id, mdate);
          let arrivalsNowRecords = await client.query(arrivalsNowQuery);
          
          let dataContainer = {};
          let counter = 0;
          
          arrivalsNowRecords.rows.forEach(function(value){
              dataContainer[counter] = value;
              counter++;
          });

          res.send(dataContainer);

        } finally {
          client.release();
        }
  
      })().catch(e => console.log(e.stack));
    }
} //end cbArrivalsNow





module.exports = {
    cbMooredNow: cbMooredNow,
    cbRoadsteadNow: cbRoadsteadNow,
    cbArrivalsNow: cbArrivalsNow
}