let fMooredNow = function(params){
    const query = `SELECT 
    id_control_unit_data, ship_description, 
    state_name, ts_main_event_field_val 
    FROM ships 
    INNER JOIN control_unit_data 
    ON fk_ship = id_ship
    INNER JOIN trips_logs
    ON fk_control_unit_data = id_control_unit_data
    INNER JOIN states
    ON fk_state = id_state
    WHERE (is_active = true 
    OR on_hold = true) 
    AND control_unit_data.fk_portinformer = ${params.id}
    ORDER BY id_control_unit_data, ship_description, ts_main_event_field_val`;

    return query;
}

module.exports = {
    mooredNow: fMooredNow
};
