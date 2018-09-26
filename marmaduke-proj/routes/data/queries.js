let fMooredNow = function(params){
    const query = `SELECT id_control_unit_data, ship_description, 
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
    OR ts_archived >= '${params.mdate}')
    AND fk_state in ${params.statesOfMooring}
    AND LENGTH(ts_main_event_field_val) > 4 
    AND DATE(ts_main_event_field_val) = '${params.mdate}'
    AND control_unit_data.fk_portinformer = ${params.id}
    ORDER BY ts_main_event_field_val`;

    return query;
}

module.exports = {
    mooredNow: fMooredNow
};
