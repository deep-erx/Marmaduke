"use strict";

let express = require('express');
let router = express.Router();
let configuration = require('./data/configuration');
let queries = require('./data/queries');
let moment = require('moment')

const {Pool, client} = require('pg');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Main page' });
});

router.get('/api/moored_now/:id', (req, res, next) => {
  
  const pool = new Pool(configuration.AUTH_DB);
  const id = req.params.id;
  const mdate = moment().format("YYYY-MM-DD");

  // async/await call
  (async () => {
    const client = await pool.connect();
    try {
      const params = {
        mdate: mdate,
        statesOfMooring: configuration.STATES_OF_MOORING,
        id: id
      };
      
      let queryMoored = queries.mooredNow(params);
      const records = await client.query(queryMoored);
      res.render('moored_now', {allTripsActive: records.rows});

    } finally {
      client.release();
  }})().catch(e => console.log(e.stack));
});

module.exports = router;
