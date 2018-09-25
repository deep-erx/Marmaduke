var express = require('express');
var router = express.Router();
var configuration = require('./data/configuration')
const {Pool, client} = require('pg');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Main page' });
});

router.get('/api/moored_now/:id/:start', (req, res, next) => {
  
  const pool = new Pool(configuration.AUTH_DB);
  const id = req.params.id;
  const start = req.params.start;

  // async/await call
  (async () => {
    const client = await pool.connect();
    try {

      let query = `SELECT id_control_unit_data, ship_description, 
                  state_name, ts_main_event_field_val 
                  FROM ships 
                  INNER JOIN control_unit_data 
                  ON fk_ship = id_ship
                  INNER JOIN trips_logs
                  ON fk_control_unit_data = id_control_unit_data
                  INNER JOIN states
                  ON fk_state = id_state
                  WHERE (is_active = true 
                  OR on_hold = true 
                  OR ts_archived >= '${start}')
                  AND fk_state in ${configuration.STATES_OF_MOORING}
                  AND control_unit_data.fk_portinformer = ${id}
                  ORDER BY ts_main_event_field_val` 

      const records = await client.query(query);
      res.render('moored_now', {all_trips_active: records.rows});

    } finally {
      client.release();
  }})().catch(e => console.log(e.stack))

});

module.exports = router;
